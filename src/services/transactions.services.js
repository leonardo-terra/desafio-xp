const { Transaction, User } = require('../database/models');
const Utils = require('../utils');

const getAll = async () => {
  const result = await Transaction.findAll({
    attributes: [
      'transactionId',
      ['userId', 'codCliente'],
      ['qntMovimentada', 'qntdeAtivo'],
      'preco',
      ['ativoId', 'codAtivo'],
    ],
  });
  return result;
};

const getByClientID = async ({ codCliente }) => {
  const response = await Transaction.findAll({
    where: { userId: codCliente },
    attributes: [
      ['userId', 'codCliente'],
      ['ativoId', 'codAtivo'],
      ['qntMovimentada', 'qntdeAtivo'],
      'preco',
    ],
  });
  if (response.length === 0) throw new Error('Cliente não encontrado');
  return response;
};

const getBalanceByClientID = async ({ codCliente }) => {
  const response = await User.findOne({
    where: { userId: codCliente },
    attributes: [['userId', 'codCliente'], 'saldo'],
  });
  return response;
};

const newPurchase = async ({ codCliente, codAtivo, qntdeAtivo }) => {
  const hasEnoughAsset = await Utils.hasEnoughAsset(codAtivo, qntdeAtivo);
  const hasEnoughBalance = await Utils.isBalanceValid(codCliente, qntdeAtivo, codAtivo);

  if (!hasEnoughAsset) throw new Error('Quantidade requerida indisponível.');
  if (!hasEnoughBalance) throw new Error('Saldo insuficiente');

  const transactionObj = await Utils.executePurchaseTransaction(codCliente, qntdeAtivo, codAtivo);

  return await Transaction.create(transactionObj);
};

const newSale = async ({ codCliente, codAtivo, qntdeAtivo }) => {
  const clientAmountOfOneAsset = await Utils.clientAssetQnt(codCliente, codAtivo);

  if (clientAmountOfOneAsset < qntdeAtivo) throw new Error('Você não possui ações suficientes');

  return await Utils.executeSaleTransaction(codCliente, codAtivo, qntdeAtivo);
};

module.exports = {
  getAll,
  getBalanceByClientID,
  newPurchase,
  newSale,
  getByClientID,
};
