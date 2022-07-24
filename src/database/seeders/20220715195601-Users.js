'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'leo@test.com',
          password: '$2b$04$6tqm/3pd7tXKX9flFDZry.rpwkz18ZJO.RqGc7PL1ltddbqmBxeBq',
          saldo: 150,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          email: 'henri@test.com',
          password: '$2b$05$ae2V8IMax34926E1oSX/P.q5qa.PTE5jMyEHfc1RhwzUZnM4p3Hdu',
          saldo: 235,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          email: 'teste@teste.com',
          password: '$2b$05$KPvyN2IyPhBA2DZf/4YG9ecSnrUYRCZSQW36jBcPrGqCJLPz1NADi',
          saldo: 423000,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    ),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
