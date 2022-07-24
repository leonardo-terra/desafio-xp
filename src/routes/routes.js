const express = require('express');
const transactionsController = require('../controller/transactions.controller');
const investmentsController = require('../controller/investments.controller');
const clientsController = require('../controller/clients.controller');
const authController = require('../controller/auth.controller');
const middle = require('../middlewares');

const router = express.Router();

// login
router.post('/login', authController.login);

//Contrato 1.1
router.post('/transacoes/comprar', middle.authentication, transactionsController.newPurchase);
//Contrato 1.2
router.post('/transacoes/vender', middle.authentication, transactionsController.newSale);
//Contrato 1.3
router.get('/transacoes/cliente/:codCliente', middle.authentication, transactionsController.getByClientID);
//Contrato 1.5 e 1.6
router.post('/transacoes/:operator', middle.authentication, clientsController.updateClientBalance);

//Contrato 2.0
router.get('/investimentos/transacoes', middle.authentication, investmentsController.getAllAsset);
//Contrato 1.4
router.get('/investimentos/:codAtivo', investmentsController.getByAssetById);

//Contrato 1.7
router.get('/cliente/saldo/:codCliente', middle.authentication, transactionsController.getBalanceByClientID);

// Extra
router.get('/transacoes', middle.authentication, transactionsController.getAll);

router.post('/cliente/novo', clientsController.createNewClient);

module.exports = router;
