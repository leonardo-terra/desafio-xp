const investmentsServices = require('../services/investments.services');

const getByClient = async (req, res) => {
  const response = await investmentsServices.getByClient(req.params);
  return res.status(200).send(response);
};

module.exports = { getByClient };
