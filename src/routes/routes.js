const express = require('express');
const transactionsController = require('../controller/transactions.controller');
const investmentsController = require('../controller/investments.controller');
const clientsController = require('../controller/clients.controller');
const authController = require('../controller/auth.controller');
const Middlewares = require('../middlewares');

const router = express.Router();

router.post('/login', authController.login);
router.get('/todos-investimentos/', Middlewares.authentication, transactionsController.getAll);
router.get(
  '/clientes/:codCliente',
  Middlewares.authentication,
  transactionsController.getByClientID,
);
router.get('/investimentos/:codAtivo', investmentsController.getByAssetById);
router.get(
  '/clientes/investimentos',
  Middlewares.authentication,
  investmentsController.getAllAsset,
);
router.get(
  '/conta/:codCliente',
  Middlewares.authentication,
  transactionsController.getBalanceByClientID,
);
router.post('/conta/:operator', Middlewares.authentication, clientsController.updateClientBalance);
router.post(
  '/investimentos/comprar',
  Middlewares.authentication,
  transactionsController.newPurchase,
);
router.post('/investimentos/vender', Middlewares.authentication, transactionsController.newSale);

module.exports = router;
