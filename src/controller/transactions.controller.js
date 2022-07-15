const transactionsServices = require('../services/transactions.services');

const getAll = async (req, res) => {
  const orders = await transactionsServices.getAll();
  res.status(200).json(orders);
};

const newPurchase = async (req, res) => {
  const purchase = await transactionsServices.newPurchase(req.body);
  return res.status(200).send({
    message: purchase,
  });
};

module.exports = { getAll, newPurchase };
