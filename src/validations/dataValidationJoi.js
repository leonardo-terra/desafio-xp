const Joi = require('joi');

const buyAndSalesSchema = Joi.object().keys({
  codCliente: Joi.number().required(),
  codAtivo: Joi.number().required(),
  qntdeAtivo: Joi.number().min(1).required(),
});

const depositAndWithdrawSchema = Joi.object().keys({
  codCliente: Joi.number().required(),
  valor: Joi.number().min(1).required(),
});

module.exports = { buyAndSalesSchema, depositAndWithdrawSchema }
