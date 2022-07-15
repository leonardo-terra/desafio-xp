const { Ativo } = require('../database/models');

const isPurchaseValid = async (ativoId, requiredAmount) => {
  const availableAmount = await Ativo.findOne({
    where: { ativoId },
  });
  if (availableAmount.dataValues.qntAtivo < requiredAmount) return false;
  return true;
};

module.exports = { isPurchaseValid };
