const transactionsServices = require('../services/transactions.services');

const getAll = async (req, res) => {
  const orders = await transactionsServices.getAll();
  res.status(200).json(orders);
};

const newPurchase = async (req, res) => {
  const purchase = await transactionsServices.newPurchase(req.body);
  const responseObj = {
    codCliente: purchase.userId,
    codAtivo: purchase.ativoId,
    qtdeAtivo: purchase.qntMovimentada,
  };
  return res.status(200).send(responseObj);
};

const newSale = async (req, res) => {
  const response = await transactionsServices.newSale(req.body);
  const transactionObj = {
    codAtivo: response.ativoId,
    codAtivo: response.ativoId,
    qntdeAtivo: response.qntMovimentada,
  };
  return res.status(200).send(response);
};

module.exports = { getAll, newPurchase, newSale };
