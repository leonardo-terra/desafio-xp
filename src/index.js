require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const salesController = require('./controller/transactions.controller');

app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/', salesController.getAll);

app.listen(port, () => console.log(`Ouvindo na porta ${port}`));
