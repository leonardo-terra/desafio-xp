const transactionsServices = require('../services/transactions.services');
const { buyAndSalesSchema } = require('../validations/dataValidationJoi');

const getAll = async (_req, res) => {
  const orders = await transactionsServices.getAll();

  res.status(200).json(orders);
};

const getByID = async (req, res) => {
  const response = await clientService.getByID(req.params);
  if (!response) throw new Error('Cliente não encontrado');
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

module.exports = { getAll, getByID, newPurchase, newSale };
