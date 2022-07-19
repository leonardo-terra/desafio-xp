const clientService = require('../services/clients.services');

const updateClientBalance = async (req, res) => {
  const response = await clientService.updateClientBalance(
    req.body,
    req.params,
  );
  return res.status(200).send(response);
};

module.exports = { updateClientBalance };
