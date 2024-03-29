const Auth = require('../services/auth.services');

const login = async (req, res) => {
  try {
    const token = await Auth.authentication(req.body);
    return res.status(202).json(token);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

module.exports = { login };
