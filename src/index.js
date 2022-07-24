require('dotenv').config();
require('express-async-errors');
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerConfig = require('./docs/swagger.config');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors')
const Middlewares = require('./middlewares');

const app = express();
app.use(express.json());
app.use(cors())
const swaggerDoc = swaggerJSDOC(swaggerConfig);
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const port = process.env.PORT || 3001;

// Routes
app.use('/', routes);
app.use(Middlewares.errorHandler);

app.listen(port, () => console.log(`Ouvindo na porta ${port}`));
