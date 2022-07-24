const sinon = require('sinon');
const { expect } = require('chai');
const investmentsService = require('../../services/investments.services');

describe('Busca de uma ação', () => {
  describe('por ID, quando a ação nao existe', () => {
    before(() => {
      sinon
        .stub(investmentsService, 'getByAssetById')
        .resolves(new Error('Código de ativo inválido'));
    });
    after(() => {
      investmentsService.getByAssetById.restore();
    });
    it('Retorna uma exceção com a mensagem "Código de ativo inválido"', async () => {
      const TEST_ID = 1;
      const response = await investmentsService.getByAssetById(TEST_ID);
      expect(response).to.an('error');
      expect(response).to.have.property('message', 'Código de ativo inválido');
    });
  });
  describe('por ID, quando a ação existe', () => {
    before(() => {
      sinon.stub(investmentsService, 'getByAssetById').resolves({
        codAtivo: 1,
        qntdeAtivo: 400,
        preco: '150',
      });
    });
    after(() => {
      investmentsService.getByAssetById.restore();
    });
    it('Retorna as informações da ação', async () => {
      const TEST_ID = 1;
      const response = await investmentsService.getByAssetById(TEST_ID);
      expect(response).to.be.an('object');
      expect(response).to.have.property('codAtivo');
      expect(response).to.have.property('qntdeAtivo');
      expect(response).to.have.property('preco');
      expect(response.codAtivo).to.be.equal(TEST_ID);
      expect(response.qntdeAtivo).to.be.equal(400);
      expect(response.preco).to.be.equal('150');
    });
  });
  describe('toda ações', () => {
    before(() => {
      sinon.stub(investmentsService, 'getAllAsset').resolves([
        {
          codAtivo: 1,
          nome: 'BB',
          qntdeAtivo: 400,
          valor: '150',
          transactions: [
            {
              transactionId: 1,
              qntdeMovimentada: 20,
              codCliente: 2,
            },
            {
              transactionId: 2,
              qntdeMovimentada: 23,
              codCliente: 1,
            },
          ],
        },
        {
          codAtivo: 2,
          nome: 'Caixa',
          qntdeAtivo: 5000,
          valor: '140',
          transactions: [
            {
              transactionId: 3,
              qntdeMovimentada: 50,
              codCliente: 3,
            },
            {
              transactionId: 4,
              qntdeMovimentada: 40,
              codCliente: 2,
            },
          ],
        },
        {
          codAtivo: 3,
          nome: 'Itau',
          qntdeAtivo: 200,
          valor: '400',
          transactions: [
            {
              transactionId: 5,
              qntdeMovimentada: 2,
              codCliente: 3,
            },
          ],
        },
      ]);
    });
    after(() => {
      investmentsService.getAllAsset.restore();
    });
    it('Retorna as informações da ação', async () => {
      const response = await investmentsService.getAllAsset();
      expect(response).to.be.an('array');
      expect(response[0]).to.have.property('codAtivo');
      expect(response[0]).to.have.property('nome');
      expect(response[0]).to.have.property('qntdeAtivo');
      expect(response[0]).to.have.property('valor');
      expect(response[0]).to.have.property('transactions');
      expect(response[0].codAtivo).to.be.equal(1);
      expect(response[0].nome).to.be.equal('BB');
      expect(response[0].qntdeAtivo).to.be.equal(400);
      expect(response[0].valor).to.be.equal('150');
    });
  });
});
