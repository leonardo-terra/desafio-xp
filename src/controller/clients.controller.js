const clientService = require('../services/clients.services');
const { depositAndWithdrawSchema, newClient } = require('../validations/dataValidationJoi');

const updateClientBalance = async (req, res) => {
  await depositAndWithdrawSchema.validateAsync(req.body);
  const response = await clientService.updateClientBalance(req.body, req.params);
  return res.status(200).send(response);
};

const createNewClient = async (req, res) => {
  await newClient.validateAsync(req.body);
  await clientService.createNewClient(req.body);
  return res.status(201).end();
};

module.exports = { updateClientBalance, createNewClient };
