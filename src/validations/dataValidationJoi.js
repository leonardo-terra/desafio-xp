const Joi = require('joi');

const buyAndSalesSchema = Joi.object()
  .keys({
    codCliente: Joi.number().required(),
    codAtivo: Joi.number().required(),
    qntdeAtivo: Joi.number().min(1).required(),
  })
  .required()
  .messages({
    'any.required': '{{#label}} é de preenchimento obrigatório.',
    'number.base': '{{#label}} precisa ser um número inteiro.',
    'number.min': '{{#label}} precisa ser maior que zero.',
  });

const depositAndWithdrawSchema = Joi.object()
  .keys({
    codCliente: Joi.number().required(),
    valor: Joi.number().min(1).required(),
  })
  .required()
  .messages({
    'any.required': '{{#label}} é de preenchimento obrigatório.',
    'number.base': '{{#label}} precisa ser um número inteiro.',
    'number.min': '{{#label}} precisa ser maior que zero.',
  });

const newClient = Joi.object()
  .keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    saldo: Joi.number().min(0).required(),
  })
  .required()
  .messages({
    'any.required': '{{#label}} é de preenchimento obrigatório.',
    'number.base': '{{#label}} precisa ser um número inteiro.',
    'string.min': '{{#label}} precisa ter ao menos 6 caracteres',
    'number.min': '{{#label}} precisa ser maior que zero.',
    'string.email': '{{#label}} precisa de um formato válido',
  });

module.exports = { buyAndSalesSchema, depositAndWithdrawSchema, newClient };
