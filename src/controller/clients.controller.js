const clientService = require('../services/clients.services');

const updateClientBalance = async (req, res) => {
  const response = await clientService.updateClientBalance(
    req.body,
    req.params,
  );
  return res.status(200).send(response);
};

const getByID = async (req, res) => {
  const response = await clientService.getByID(req.params);
  if (!response) throw new Error('Cliente não encontrado');
  return res.status(200).send(response);
};

module.exports = { updateClientBalance, getByID };
