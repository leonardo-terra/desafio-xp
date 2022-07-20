const express = require('express');
const transactionController = require('../controller/transactions.controller');
const investmentsController = require('../controller/investments.controller');
const clientsController = require('../controller/clients.controller');
const authController = require('../controller/auth.controller');
const Middlewares = require('../middlewares');

const router = express.Router();

//Tags: Login, User, Assets
/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Endpoint destinado para autenticação.
 */

/**
 * @swagger
 * tags:
 *  name: Usuários
 *  description: Endpoint destinado para consultas aos dados dos clientes e suas ações.
 */

/**
 * @swagger
 * tags:
 *  name: Transações
 *  description: Endpoint destinado para consultas às transações.
 */

// Schema: Login, LoginResponse
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

//Rotas: Login

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

/**
 * @swagger
 * /User:
 *    get:
 *      tags: [Usuários]
 *      description: Endpoint para login!
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

// login
router.post('/login', authController.login);
//get all Transactions
router.get('/', Middlewares.authentication, transactionController.getAll);

//get by clientId
router.get('/client/:codCliente', Middlewares.authentication, investmentsController.getByClient);
//get by assetId
router.get('/asset/:codAtivo', investmentsController.getByAsset);
//get all assets
router.get('/asset', Middlewares.authentication, investmentsController.getAllAsset);
//get by clientId its balance
router.get('/conta/:codCliente', Middlewares.authentication, clientsController.getByID);

router.post('/conta/:operator', Middlewares.authentication, clientsController.updateClientBalance);
router.post('/purchase', Middlewares.authentication, transactionController.newPurchase);
router.post('/sale', Middlewares.authentication, transactionController.newSale);

module.exports = router;
