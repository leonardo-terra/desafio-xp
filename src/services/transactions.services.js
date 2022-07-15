const { Transaction } = require('../database/models');

const getAll = async () => {
  const result = await Transaction.findAll();
  return result;
};

const newPurchase = async ({ codCliente, codAtivo, qntDeAtivo }) => {
  const transaction = {
    ativoId: codAtivo,
    userId: codCliente,
    qntMovimentada: qntDeAtivo,
  };
  const result = await Transaction.create(transaction);
  return result;
};

module.exports = {
  getAll,
  newPurchase,
};
