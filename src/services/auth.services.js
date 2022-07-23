const { generateToken } = require('../utils/JWT');
const { User } = require('../database/models');

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios');
  }

  const userInfo = await User.findOne({
    where: { email, password },
  });
  if (!userInfo) throw new Error('Email ou senha inválidos');

  const token = generateToken(userInfo);
  return { token };
};

module.exports = { authentication };
