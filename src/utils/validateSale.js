const { User, Ativo, Transaction } = require('../database/models');

// Returna
// Qnt ativos disponíveis no banco.
// Saldo do cliente
// Preço das ações
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

  const newClientBalance =
    transactionInfo.clientsBalance + transactionInfo.assetPrice * qntdeAtivo;

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
      qntAtivo: newBankQnt,
    },
    {
      where: { ativoId },
    },
  );

  const response = await Transaction.create({
    ativoId,
    qntMovimentada: -qntdeAtivo,
    preco: transactionInfo.assetPrice,
    userId,
  });

  return {
    codCliente: userId,
    codAtivo: ativoId,
    qntdeAtivo,
  };
};

module.exports = { clientAssetQnt, executeSaleTransaction };
