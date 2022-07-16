const { Transaction } = require('../database/models');
const { Ativo } = require('../database/models');
const Utils = require('../utils');

const getAll = async () => {
  const result = await Transaction.findAll();
  return result;
};

// Saldo suficiente? > Existe estoque? > { [debita/credita] > transaciona }
const newPurchase = async ({ codCliente, codAtivo, qntdeAtivo }) => {
  const transactionValues = await Utils.transactionValues(codCliente, codAtivo);

  const transactionObj = {
    ativoId: codAtivo,
    userId: codCliente,
    qntMovimentada: qntdeAtivo,
    preco: transactionValues.assetPrice,
  };

  const hasEnoughAsset = await Utils.hasEnoughAsset(codAtivo, qntdeAtivo);
  if (!hasEnoughAsset) throw new Error('Quantidade requerida indisponível.');

  const hasEnoughBalance = await Utils.isBalanceValid(
    codCliente,
    qntdeAtivo,
    codAtivo,
  );
  if (!hasEnoughBalance) throw new Error('Saldo insuficiente');

  await Utils.executeTransaction(codCliente, qntdeAtivo, codAtivo);

  return await Transaction.create(transactionObj);
};

/* const newSale = async ({ codCliente, codAtivo, qntdeAtivo }) => {
  return { message: 'oi' };
}; */

module.exports = {
  getAll,
  newPurchase,
  /*   newSale, */
};
