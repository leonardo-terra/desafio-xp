/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = ({ email, password }) =>
  jwt.sign({ data: email, password }, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) {
    throw new Error('Token not found');
  }
  try {
    const validate = await jwt.verify(token, JWT_SECRET, jwtConfig);
    return validate;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, authenticateToken };
