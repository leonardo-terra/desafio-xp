const { Ativo } = require('../database/models');
const { User } = require('../database/models');

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

const executeTransaction = async (userId, requiredAmount, ativoId) => {
  const transactionInfo = await transactionValues(userId, ativoId);

  const newAssetQnt = transactionInfo.assetQnt - requiredAmount;
  const newClientBalance =
    transactionInfo.clientsBalance -
    requiredAmount * transactionInfo.assetPrice;
  await User.update(
    {
      saldo: newClientBalance,
    },
    {
      where: { userId },
    },
  );

  await Ativo.update(
    {
      qntAtivo: newAssetQnt,
    },
    {
      where: { ativoId },
    },
  );
};

module.exports = { isBalanceValid, hasEnoughAsset, executeTransaction };
