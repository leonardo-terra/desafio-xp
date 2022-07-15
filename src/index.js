require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const transactionController = require('./controller/transactions.controller');

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/', transactionController.getAll);
app.post('/purchase', transactionController.newPurchase);

app.listen(port, () => console.log(`Ouvindo na porta ${port}`));
