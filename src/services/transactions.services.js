const { Transaction } = require('../database/models');

const getAll = async () => {
  const result = await Transaction.findAll();
  return result;
};

module.exports = {
  getAll,
};
