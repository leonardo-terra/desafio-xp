require('dotenv').config();
require('express-async-errors');
const express = require('express');

const transactionController = require('./controller/transactions.controller');
const investmentsController = require('./controller/investments.controller');
const clientsController = require('./controller/clients.controller');
const Middlewares = require('./middlewares');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

// Routes
app.get('/', transactionController.getAll);
app.post('/purchase', transactionController.newPurchase);
app.post('/sale', transactionController.newSale);
app.get('/client/:codCliente', investmentsController.getByClient);
app.get('/asset/:codAtivo', investmentsController.getByAsset);
app.post('/conta/:operator', clientsController.updateClientBalance);

app.use(Middlewares.errorHandler);
app.listen(port, () => console.log(`Ouvindo na porta ${port}`));
