const clientService = require('../services/clients.services');
const { depositAndWithdrawSchema } = require('../validations/dataValidationJoi');

const updateClientBalance = async (req, res) => {
  await depositAndWithdrawSchema.validateAsync(req.body);
  const response = await clientService.updateClientBalance(
    req.body,
    req.params,
  );
  return res.status(200).send(response);
};



module.exports = { updateClientBalance };
