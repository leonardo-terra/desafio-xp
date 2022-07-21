const { Transaction, Ativo } = require('../database/models');

const getByAssetById = async ({ codAtivo }) =>
  Ativo.findAll({
    where: { ativoId: codAtivo },
    attributes: [['ativoId', 'codAtivo'], ['qntAtivo', 'qntdeAtivo'], 'preco'],
  });

const getAllAsset = async () =>
  Ativo.findAll({
    attributes: [['ativoId', 'codAtivo'], 'nome', ['qntAtivo', 'qntdeAtivo'], ['preco', 'valor']],
    include: [
      {
        model: Transaction,
        as: 'transactions',
        attributes: [
          'transactionId',
          ['qntMovimentada', 'qntdeMovimentada'],
          ['userId', 'codCliente'],
        ],
      },
    ],
  });

module.exports = { getByAssetById, getAllAsset };
