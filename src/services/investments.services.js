const { Transaction, Ativo, sequelize } = require('../database/models');

const getByClient = async ({ codCliente }) => {
  const response = await Transaction.findAll({
    attributes: [
      'userId',
      [sequelize.fn('sum', sequelize.col('qntMovimentada')), 'qntMovimentada'],
      'ativoId',
    ],
    where: { userId: codCliente },
    group: 'ativoId',
    order: [['ativoId', 'ASC']],
  });
  const ativoResponse = await Ativo.findAll({
    attributes: ['ativoId', 'preco'],
  });

  const transactionArr = response.map((el) => ({
    codCliente: el.dataValues.userId,
    codAtivo: el.dataValues.ativoId || 0,
    qntdeAtivo: el.dataValues.qntMovimentada || 0,
  }));

  const priceArr = ativoResponse.map((el) => ({
    ativoId: el.dataValues.ativoId,
    preco: el.dataValues.preco,
  }));

  const mergedArr = transactionArr.map((transaction) => ({
    ...transaction,
    price: priceArr.find(({ ativoId }) => transaction.codAtivo === ativoId)
      .preco,
  }));

  return mergedArr;
};

const getByAsset = async ({ codAtivo }) =>
  Ativo.findAll({
    where: { ativoId: codAtivo },
    attributes: [
      ['ativoId', 'codAtivo'],
      ['qntAtivo', 'qntdeAtivo'],
      ['preco', 'valor'],
    ],
  });

module.exports = { getByClient, getByAsset };
