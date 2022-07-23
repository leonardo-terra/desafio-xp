const { Transaction, Ativo } = require('../database/models');

const getByAssetById = async ({ codAtivo }) => {
  const response = await Ativo.findAll({
    where: { ativoId: codAtivo },
    attributes: [['ativoId', 'codAtivo'], ['qntAtivo', 'qntdeAtivo'], 'preco'],
  });
  if (response.length === 0) throw new Error('Código de ativo inválido');
  
  return response;
};

const getAllAsset = () =>
  Ativo.findAll({
    attributes: [['ativoId', 'codAtivo'], 'nome', ['qntAtivo', 'qntdeAtivo'], ['preco', 'valor']],
    include: [
      {
        model: Transaction,
        as: 'transactions',
        attributes: ['transactionId', ['qntMovimentada', 'qntdeMovimentada'], ['userId', 'codCliente']],
      },
    ],
  });

module.exports = { getByAssetById, getAllAsset };
