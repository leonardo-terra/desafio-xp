const transactionsServices = require('../services/transactions.services');
const { buyAndSalesSchema } = require('../validations/dataValidationJoi');

const getAll = async (_req, res) => {
  const orders = await transactionsServices.getAll();

  res.status(200).json(orders);
};

const getByClientID = async (req, res) => {
  const response = await transactionsServices.getByClientID(req.params);

  return res.status(200).send(response);
};

const getBalanceByClientID = async (req, res) => {
  const response = await transactionsServices.getBalanceByClientID(req.params);
  return res.status(200).send(response);
};

const newPurchase = async (req, res) => {
  await buyAndSalesSchema.validateAsync(req.body);
  const purchase = await transactionsServices.newPurchase(req.body);
  const responseObj = {
    codCliente: purchase.userId,
    codAtivo: purchase.ativoId,
    qtdeAtivo: purchase.qntMovimentada,
  };
  return res.status(200).send(responseObj);
};

const newSale = async (req, res) => {
  await buyAndSalesSchema.validateAsync(req.body);
  const response = await transactionsServices.newSale(req.body);
  return res.status(200).send(response);
};

module.exports = { getAll, getBalanceByClientID, newPurchase, newSale, getByClientID };
