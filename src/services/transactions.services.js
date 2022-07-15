const { Transaction } = require('../database/models');
const Utils = require('../utils');

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
  const isValid = await Utils.isPurchaseValid(codAtivo, qntDeAtivo);
  if (!isValid) throw new Error('Quantidade requerida indisponível.');
  return await Transaction.create(transaction);
};

module.exports = {
  getAll,
  newPurchase,
};
