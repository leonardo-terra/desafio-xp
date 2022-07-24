const { User } = require('../database/models');
const bcrypt = require('bcrypt');

const balanceOperator = (operator, clientBalance, valor) => {
  if (operator === 'depositar') {
    const newBalance = clientBalance + valor;
    return newBalance;
  }
  if (operator === 'sacar') {
    const newBalance = clientBalance - valor;
    return newBalance;
  }
};

const isEmailUnique = async (email) => {
  const response = await User.findOne({
    where: { email },
  });
  if (response === null) return true;
  return false;
};

const updateClientBalance = async ({ codCliente, valor }, { operator }) => {
  const clientResponse = await User.findOne({
    where: { userId: codCliente },
  });

  if (!clientResponse) throw new Error('Cliente não encontrado');

  const clientBalance = clientResponse.dataValues.saldo;
  const newBalance = balanceOperator(operator, clientBalance, valor);
  if ((operator === 'sacar') & (newBalance < 0)) throw new Error('Saldo insuficiente');

  await User.update({ saldo: newBalance }, { where: { userID: codCliente } });

  return {
    codCliente,
    saldo: newBalance,
  };
};

const createNewClient = async (userInfo) => {
  const isUnique = await isEmailUnique(userInfo.email);
  if (!isUnique) throw new Error('Email já cadastrado.');
  const salt = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(userInfo.password, salt);
  await User.create(userInfo);
  return;
};

module.exports = { updateClientBalance, createNewClient };
