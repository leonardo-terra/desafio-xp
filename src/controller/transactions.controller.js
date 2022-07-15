const transactionsServices = require('../services/transactions.services');

const getAll = async (req, res) => {
  const orders = await transactionsServices.getAll();
  res.status(200).json(orders);
};

module.exports = { getAll };
