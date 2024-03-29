const clientServices = require('../../services/clients.services');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Cliente deposita ou saca dinheiro da conta', () => {
  describe('cliente deposita ou saca dinheiro na conta', () => {
    describe('caso o cliente nao seja válido', () => {
      before(() => {
        sinon.stub(clientServices, 'updateClientBalance').resolves(new Error('Cliente não encontrado'));
      });
      after(() => {
        clientServices.updateClientBalance.restore();
      });
      it('Retorna uma exceção com a mensagem "Cliente não encontrado"', async () => {
        const response = await clientServices.updateClientBalance();
        expect(response).to.an('error');
        expect(response).to.have.property('message', 'Cliente não encontrado');
      });
    });

    describe('caso o cliente seja válido', () => {
      const COD_CLIENTE = 1;
      const VALOR = 100;
      before(() => {
        sinon.stub(clientServices, 'updateClientBalance').resolves({
          codCliente: 1,
          saldo: 750,
        });
      });
      after(() => {
        clientServices.updateClientBalance.restore();
      });

      it('Retorna o código do cliente com o novo saldo', async () => {
        const response = await clientServices.updateClientBalance(COD_CLIENTE, VALOR, 'depositar');
        expect(response).to.be.an('object');
        expect(response).to.have.property('codCliente');
        expect(response).to.have.property('saldo');
        expect(response.codCliente).to.be.equal(COD_CLIENTE);
        expect(response.saldo).to.be.equal(750);
      });
    });
  });
});

describe('Cria novo cliente', () => {
  describe('quando o payload informado é invalido', () => {
    before(() => {
      sinon.stub(clientServices, 'createNewClient').resolves(new Error('Dados informados inválidos'));
    });
    after(() => {
      clientServices.createNewClient.restore();
    });
    it('retorna uma exceção com a mensagem "Dados informados inválidos"', async () => {
      const requestBody = {};
      const response = await clientServices.createNewClient(requestBody);
      expect(response).to.be.an('error');
      expect(response).to.have.property('message', 'Dados informados inválidos');
    });
  });
  describe('quando a requisição ocorre com sucesso', () => {
    before(() => {
      sinon.stub(clientServices, 'createNewClient').resolves();
    });
    after(() => {
      clientServices.createNewClient.restore();
    });
    it('nao há retorno', async () => {
      const response = await clientServices.createNewClient();
      expect(response).to.be.undefined;
    });
  });
});
