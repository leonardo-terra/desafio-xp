require('dotenv').config();
require('express-async-errors');
const express = require('express');

const transactionController = require('./controller/transactions.controller');
const investmentsController = require('./controller/investments.controller');
const Middlewares = require('./middlewares');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

// Routes
app.get('/', transactionController.getAll);
app.post('/purchase', transactionController.newPurchase);
app.post('/sale', transactionController.newSale);
app.get('/ativos/:codCliente', investmentsController.getByClient);

app.use(Middlewares.errorHandler);
app.listen(port, () => console.log(`Ouvindo na porta ${port}`));
