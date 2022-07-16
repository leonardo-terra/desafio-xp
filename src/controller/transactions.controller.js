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

module.exports = { getAll, newPurchase };
