const { User, Ativo, Transaction } = require('../database/models');
const Sequelize = require('sequelize');

const config = require('../database/config/config');

const transactionValues = async (userId, ativoId) => {
  const userResponse = await User.findOne({
    where: { userId },
  });
  const assetResponse = await Ativo.findOne({
    where: { ativoId },
  });

  const assetQnt = assetResponse.dataValues.qntAtivo;
  const assetPrice = assetResponse.dataValues.preco;
  const clientsBalance = userResponse.dataValues.saldo;

  return { clientsBalance, assetPrice, assetQnt };
};

const clientAssetQnt = async (userId, ativoId) => {
  const transactionResponse = await Transaction.findAll({
    where: { ativoId, userId },
  });

  const clientAmountOfOneAsset = transactionResponse
    .map((el) => el.qntMovimentada * el.preco)
    .reduce((a, b) => a + b, 0);
  return clientAmountOfOneAsset;
};

const executeSaleTransaction = async (userId, ativoId, qntdeAtivo) => {
  const transactionInfo = await transactionValues(userId, ativoId);

  const newBankQnt = transactionInfo.assetQnt + qntdeAtivo;

  const newClientBalance = transactionInfo.clientsBalance + transactionInfo.assetPrice * qntdeAtivo;

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
        qntAtivo: newBankQnt,
      },
      {
        where: { ativoId },
      },
      { transaction: t },
    );

    await Transaction.create(
      {
        ativoId,
        qntMovimentada: -qntdeAtivo,
        preco: transactionInfo.assetPrice,
        userId,
      },
      { transaction: t },
    );
    await t.commit();

    return {
      codCliente: userId,
      codAtivo: ativoId,
      qntdeAtivo,
    };
  } catch (error) {
    await t.rollback();
    throw new Error('Algo deu errado, tente novamente mais tarde.');
  }
};

module.exports = { clientAssetQnt, executeSaleTransaction };
