require('dotenv').config();
require('express-async-errors');
const express = require('express');

const transactionController = require('./controller/transactions.controller');
const investmentsController = require('./controller/investments.controller');
const clientsController = require('./controller/clients.controller');
const authController = require('./controller/auth.controller');
const Middlewares = require('./middlewares');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3001;

// Routes
app.get('/', transactionController.getAll);
app.get(
  '/client/:codCliente',
  Middlewares.authentication,
  investmentsController.getByClient,
);
app.get('/asset/:codAtivo', investmentsController.getByAsset);
app.get(
  '/conta/:codCliente',
  Middlewares.authentication,
  clientsController.getByID,
);
app.get(
  '/asset',
  Middlewares.authentication,
  investmentsController.getAllAsset,
);

app.post('/login', authController.login);
app.post(
  '/conta/:operator',
  Middlewares.authentication,
  clientsController.updateClientBalance,
);
app.post(
  '/purchase',
  Middlewares.authentication,
  transactionController.newPurchase,
);
app.post('/sale', Middlewares.authentication, transactionController.newSale);

app.use(Middlewares.errorHandler);
app.listen(port, () => console.log(`Ouvindo na porta ${port}`));

//s