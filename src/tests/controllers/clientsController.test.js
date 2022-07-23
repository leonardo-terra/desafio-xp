const sinon = require('sinon');
const { expect } = require('chai');

const clientsController = require('../../controller/clients.controller');
const clientsServices = require('../../services/clients.services');

describe('Ao realizar um deposito ou saque', async () => {
  const response = {};
  const request = {};

  before(() => {
    request.body = {
      codCliente: 1,
      valor: 1,
    };
    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns();

    sinon.stub(clientsServices, 'updateClientBalance').resolves({
      codCliente: 1,
      valor: 1,
    });
  });
  after(() => {
    clientsServices.updateClientBalance.restore();
  });

  it('retorna o status code 200', async () => {
    await clientsController.updateClientBalance(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Ao realizar um deposito ou saque payload incorreto', async () => {
  const response = {};
  const request = {};

  before(() => {
    request.body = {};
    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns();

    sinon.stub(clientsController, 'updateClientBalance').resolves(new Error('Preenchimento incorreto'));
  });
  after(() => {
    clientsController.updateClientBalance.restore();
  });

  it('lança uma exceção com a mensagem "Preenchimento incorreto"', async () => {
    const res = await clientsController.updateClientBalance(request, response);
    expect(res).to.be.an('error');
    expect(res).to.have.property('message', 'Preenchimento incorreto');
  });
});
