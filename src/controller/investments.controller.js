const investmentsServices = require('../services/investments.services');

const getByClient = async (req, res) => {
  const response = await investmentsServices.getByClient(req.params);
  return res.status(200).send(response);
};

const getByAsset = async (req, res) => {
  const response = await investmentsServices.getByAsset(req.params);
  if (!response.length) throw new Error('Código de ativo inválido.');
  return res.status(200).send(response);
};



module.exports = { getByClient, getByAsset };
