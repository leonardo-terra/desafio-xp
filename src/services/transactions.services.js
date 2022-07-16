const { Transaction } = require('../database/models');
const { Ativo } = require('../database/models');
const Utils = require('../utils');

const getAll = async () => {
  const result = await Transaction.findAll();
  return result;
};

// Saldo suficiente? > Existe estoque? > { [debita/credita] > transaciona }
const newPurchase = async ({ codCliente, codAtivo, qntDeAtivo }) => {
  const transactionValues = await Utils.transactionValues(codCliente, codAtivo);

  const transactionObj = {
    ativoId: codAtivo,
    userId: codCliente,
    qntMovimentada: qntDeAtivo,
    preco: transactionValues.assetPrice,
  };

  const hasEnoughAsset = await Utils.hasEnoughAsset(codAtivo, qntDeAtivo);
  if (!hasEnoughAsset) throw new Error('Quantidade requerida indisponível.');

  const hasEnoughBalance = await Utils.isBalanceValid(
    codCliente,
    qntDeAtivo,
    codAtivo,
  );
  if (!hasEnoughBalance) throw new Error('Saldo insuficiente');

  await Utils.executeTransaction(codCliente, qntDeAtivo, codAtivo);

  return await Transaction.create(transactionObj);
};

module.exports = {
  getAll,
  newPurchase,
};
