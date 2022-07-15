'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Transactions',
      [
        {
          transactionId: 1,
          ativoId: 1,
          qntMovimentada: 20,
          userId: 2,
        },
        {
          transactionId: 2,
          ativoId: 1,
          qntMovimentada: 23,
          userId: 1,
        },
        {
          transactionId: 3,
          ativoId: 2,
          qntMovimentada: 50,
          userId: 3,
        },
        {
          transactionId: 4,
          ativoId: 2,
          qntMovimentada: 40,
          userId: 2,
        },
        {
          transactionId: 5,
          ativoId: 3,
          qntMovimentada: 2,
          userId: 3,
        },
      ],
      {},
    ),

  down: async (queryInterface) =>
    queryInterface.bulkDelete('Transactions', null, {}),
};
