/* const { transactionValues } = require('./validatePurchase');

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

const hasEnoughBalance = async (userId, requiredAmount, ativoId) => {
  const transactionValues = transactionValues(userId, ativoId); 
  const clientsBalance = transactionValues.clientsBalance;
  const assetPrice = transactionValues.assetPrice;

  const requiredBalance = assetPrice * requiredAmount;

  if(requiredBalance > clientsBalance) return false;
  return true

};
 */