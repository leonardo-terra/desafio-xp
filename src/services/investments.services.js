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

  const merged = transactionArr.map((transaction) => ({
    ...transaction,
    price: priceArr.find(({ ativoId }) => transaction.codAtivo === ativoId)
      .preco,
  }));

  const mergeById = (a1, a2) =>
    a1.map((itm) => ({
      ...a2.find((item) => item.ativoId === itm.ativoId && item),
      ...itm,
    }));

  const teste = mergeById(priceArr, transactionArr);

  /*   const responseObj = teste.map((el) => ({
    codCliente: el.dataValues.userId || 0,
    codAtivo: el.dataValues.ativoId || 0,
    qntdeAtivo: el.dataValues.qntMovimentada || 0,
    valor: el.preco || 0,
  })); */
  console.log(merged);
  return merged;
};

module.exports = { getByClient };
