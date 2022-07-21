const express = require('express');
const transactionsController = require('../controller/transactions.controller');
const investmentsController = require('../controller/investments.controller');
const clientsController = require('../controller/clients.controller');
const authController = require('../controller/auth.controller');
const Middlewares = require('../middlewares');

const router = express.Router();

//#region LOGIN -------------------
// Tag
/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Endpoint destinado para autenticação.
 */

// Schemas
/**
 * @swagger
 *  components:
 *   schemas:
 *      Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *          password:
 *           type: string
 *        example:
 *          email: teste@teste.com
 *          password: 123456
 */

/**
 * @swagger
 *  components:
 *   schemas:
 *      LoginResponse:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          token:
 *            type: string
 *        example:
 *          token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibGVvQHRlc3QuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJpYXQiOjE2NTgzMzQ3MzMsImV4cCI6MTY1ODMzODMzM30.zernvM38LZH6WYUpxifMPmgAmDOfWOwnTfpfpks3v80
 */

// Rotas: Login
/**
 * @swagger
 * /login:
 *    post:
 *        tags: [Login]
 *        description: Endpoint para login!
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Login'
 *        responses:
 *          202:
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/LoginResponse'
 */
router.post('/login', authController.login);
//#endregion

//#region TRANSACTIONS-------------------
//Tag
/**
 * @swagger
 * tags:
 *  name: Transações
 *  description: Endpoint destinado para requisição de dados sobre transações e ações.
 */
// Schema
/**
 * @swagger
 *  components:
 *   schemas:
 *      Transactions:
 *        type: array
 *        properties:
 *          codCliente:
 *            type: integer
 *          codAtivo:
 *            type: integer
 *          qntAtivo:
 *             type: integer
 *          preco:
 *             type: decimal
 */
//#endregion

//#region USUÁRIOS -------------------
//Tag
/**
 * @swagger
 * tags:
 *  name: Usuários
 *  description: Endpoint destinado para consultas aos dados dos clientes e suas ações.
 */

//Schemas

//Rotas
/**
 * @swagger
 * /User:
 *    get:
 *      tags: [Usuários]
 *      description: Endpoint para login!
 *
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 *    /client/{codCliente}:
 *      get:
 *          tags: [Usuários]
 *          description: Endpoint que retorna os dados do cliente desejado.
 *          parameters:
 *              -   in: path
 *                  name: codCliente
 *                  type: integer
 *                  required: true
 *          responses:
 *                200:
 *                  content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                $ref: '#/components/schemas/User'
 */
//#endregion

router.get('/', Middlewares.authentication, transactionsController.getAll);
router.get(
  '/cliente/:codCliente',
  Middlewares.authentication,
  transactionsController.getByClientID,
);
router.get('/investimentos/:codAtivo', investmentsController.getByAssetById);
router.get('/investimentos', Middlewares.authentication, investmentsController.getAllAsset);
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
