const { Ativo } = require('../database/models');
const { User } = require('../database/models');
const Sequelize = require('sequelize');

const config = require('../database/config/config');
const sequelize = new Sequelize(config.development);

const transactionValues = async (userId, ativoId) => {
  const userResponse = await User.findOne({
    where: { userId },
  });
  const assetResponse = await Ativo.findOne({
    where: { ativoId },
  });
  const availableAmount = await Ativo.findOne({
    where: { ativoId },
  });

  const assetQnt = availableAmount.dataValues.qntAtivo;
  const clientsBalance = userResponse.dataValues.saldo;
  const assetPrice = assetResponse.dataValues.preco;

  return { clientsBalance, assetPrice, assetQnt };
};

const isBalanceValid = async (userId, requiredAmount, ativoId) => {
  const transactionInfo = await transactionValues(userId, ativoId);

  const transactionPrice = transactionInfo.assetPrice * requiredAmount;

  if (transactionPrice > transactionInfo.clientsBalance) return false;

  return true;
};

const hasEnoughAsset = async (ativoId, requiredAmount) => {
  const availableAmount = await Ativo.findOne({
    where: { ativoId },
  });

  if (availableAmount.dataValues.qntAtivo < requiredAmount) return false;
  return true;
};

const executePurchaseTransaction = async (userId, requiredAmount, ativoId) => {
  const transactionInfo = await transactionValues(userId, ativoId);
  const newAssetQnt = transactionInfo.assetQnt - requiredAmount;
  const newClientBalance = transactionInfo.clientsBalance - requiredAmount * transactionInfo.assetPrice;

  const sequelize = new Sequelize(config.development);
  const t = await sequelize.transaction();

  try {
    await User.update(
      {
        saldo: newClientBalance,
      },
      {
        where: { userId },
      },
      { transaction: t },
    );

    await Ativo.update(
      {
        qntAtivo: newAssetQnt,
      },
      {
        where: { ativoId },
      },
      { transaction: t },
    );

    await t.commit();

    return {
      ativoId,
      userId,
      qntMovimentada: requiredAmount,
      preco: transactionInfo.assetPrice,
    };
  } catch (error) {
    await t.rollback();
    throw new Error('Algo deu errado, tente novamente mais tarde.');
  }
};

module.exports = {
  isBalanceValid,
  hasEnoughAsset,
  executePurchaseTransaction,
  transactionValues,
};
