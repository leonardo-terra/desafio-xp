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

module.exports = { buyAndSalesSchema, depositAndWithdrawSchema };
