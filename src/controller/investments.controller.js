const investmentsServices = require('../services/investments.services');

const getByAssetById = async (req, res) => {
  const response = await investmentsServices.getByAssetById(req.params);
  if (!response.length) throw new Error('Código de ativo inválido.');
  return res.status(200).send(response);
};

const getAllAsset = async (_req, res) => {
  const response = await investmentsServices.getAllAsset();
  if (!response.length) throw new Error('Código de ativo inválido.');
  return res.status(200).send(response);
};

module.exports = { getByAssetById, getAllAsset };
