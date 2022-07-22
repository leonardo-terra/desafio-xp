const { User } = require('../database/models');

const balanceOperator = (operator, clientBalance, valor) => {
  if (operator === 'deposito') {
    const newBalance = clientBalance + valor;
    return newBalance;
  }
  if (operator === 'saque') {
    const newBalance = clientBalance - valor;
    return newBalance;
  }
};

const updateClientBalance = async ({ codCliente, valor }, { operator }) => {
  const clientResponse = await User.findOne({
    where: { userId: codCliente },
  });

  if (!clientResponse) throw new Error('Cliente não encontrado');

  const clientBalance = clientResponse.dataValues.saldo;
  const newBalance = balanceOperator(operator, clientBalance, valor);

  await User.update({ saldo: newBalance }, { where: { userID: codCliente } });

  return {
    codCliente,
    saldo: newBalance,
  };
};

module.exports = { updateClientBalance };
