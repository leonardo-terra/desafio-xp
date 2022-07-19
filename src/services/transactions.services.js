const { Transaction } = require('../database/models');
const { Ativo } = require('../database/models');
const Utils = require('../utils');

const getAll = async () => {
  const result = await Transaction.findAll();
  return result;
};

// Saldo suficiente? > Existe estoque? > { [debita/credita] > transaciona }
// Compra na visão do cliente.
const newPurchase = async ({ codCliente, codAtivo, qntdeAtivo }) => {
  const hasEnoughAsset = await Utils.hasEnoughAsset(codAtivo, qntdeAtivo);
  const hasEnoughBalance = await Utils.isBalanceValid(
    codCliente,
    qntdeAtivo,
    codAtivo,
  );

  if (!hasEnoughAsset) throw new Error('Quantidade requerida indisponível.');
  if (!hasEnoughBalance) throw new Error('Saldo insuficiente');

  const transactionObj = await Utils.executePurchaseTransaction(
    codCliente,
    qntdeAtivo,
    codAtivo,
  );

  return await Transaction.create(transactionObj);
};

// Venda na visão do cliente.
const newSale = async ({ codCliente, codAtivo, qntdeAtivo }) => {
  const clientAmountOfOneAsset = await Utils.clientAssetQnt(
    codCliente,
    codAtivo,
  );

  if (clientAmountOfOneAsset < qntdeAtivo)
    throw new Error('Você não possui ações suficientes');

  return await Utils.executeSaleTransaction(codCliente, codAtivo, qntdeAtivo);
};

module.exports = {
  getAll,
  newPurchase,
  newSale,
};
