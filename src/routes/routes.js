const express = require('express');
const transactionsController = require('../controller/transactions.controller');
const investmentsController = require('../controller/investments.controller');
const clientsController = require('../controller/clients.controller');
const authController = require('../controller/auth.controller');
const Middlewares = require('../middlewares');

const router = express.Router();

router.post('/login', authController.login);
router.get('/transacoes/cliente/:codCliente', Middlewares.authentication, transactionsController.getByClientID);
router.get('/investimentos/transacoes', Middlewares.authentication, investmentsController.getAllAsset);
router.post('/transacoes/comprar', Middlewares.authentication, transactionsController.newPurchase);
router.post('/transacoes/vender', Middlewares.authentication, transactionsController.newSale);
router.post('/transacoes/:operator', Middlewares.authentication, clientsController.updateClientBalance);
router.get('/transacoes', Middlewares.authentication, transactionsController.getAll);
router.get('/investimentos/:codAtivo', investmentsController.getByAssetById);
router.get('/cliente/saldo/:codCliente', Middlewares.authentication, transactionsController.getBalanceByClientID);

module.exports = router;
