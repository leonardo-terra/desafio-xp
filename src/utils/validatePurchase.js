const { Ativo } = require('../database/models');

const isPurchaseValid = async (ativoId, requiredAmount) => {
  const availableAmount = await Ativo.findOne({
    where: { ativoId },
  });

  if (availableAmount.dataValues.qntAtivo < requiredAmount) return false;

  const newAmount = availableAmount.dataValues.qntAtivo - requiredAmount;

  await Ativo.update(
    {
      qntAtivo: newAmount,
    },
    {
      where: { ativoId },
    },
  );
  console.log(newAmount);
  return true;
};

module.exports = { isPurchaseValid };
