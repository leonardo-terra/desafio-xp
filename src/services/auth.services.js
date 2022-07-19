const { generateToken } = require('../utils/JWT');
const { User } = require('../database/models');

const authentication = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error('Email or password not found');
  }

  const userInfo = await User.findOne({
    where: { email, password },
  });
  if (!userInfo) throw new Error('Invalid email or password');

  const token = generateToken(userInfo);
  return { token };
};

module.exports = { authentication };
