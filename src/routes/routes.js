const express = require('express');
const transactionController = require('../controller/transactions.controller');
const investmentsController = require('../controller/investments.controller');
const clientsController = require('../controller/clients.controller');
const authController = require('../controller/auth.controller');
const Middlewares = require('../middlewares');

const router = express.Router();

router.get('/', transactionController.getAll);
router.get('/client/:codCliente', Middlewares.authentication, investmentsController.getByClient);
router.get('/asset/:codAtivo', investmentsController.getByAsset);
router.get('/conta/:codCliente', Middlewares.authentication, clientsController.getByID);
router.get('/asset', Middlewares.authentication, investmentsController.getAllAsset);

router.post('/login', authController.login);
router.post('/conta/:operator', Middlewares.authentication, clientsController.updateClientBalance);
router.post('/purchase', Middlewares.authentication, transactionController.newPurchase);
router.post('/sale', Middlewares.authentication, transactionController.newSale);

module.exports = router;
