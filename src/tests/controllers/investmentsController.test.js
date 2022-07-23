const sinon = require('sinon');
const { expect } = require('chai');

const investmentsController = require('../../controller/investments.controller');
const investmentsServices = require('../../services/investments.services');

describe('Ao realizar consulta a investimentos', () => {
  const response = {};
  const request = {};

  describe('por todos os investimentos disponíveis', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(investmentsServices, 'getAllAsset').resolves([
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
      investmentsServices.getAllAsset.restore();
    });
    it('retorna o status code 200', async () => {
      await investmentsController.getAllAsset(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('investimentos pelo seu ID', () => {
    describe('se o ID não existir no banco', async () => {
      before(() => {
        request.params = 12;
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();

        sinon.stub(investmentsController, 'getByAssetById').resolves(new Error('Código de ativo inválido'));
      });
      after(() => {
        investmentsController.getByAssetById.restore();
      });

      it('lança uma exceção com a mensagem "Código de ativo inválido"', async () => {
        const res = await investmentsController.getByAssetById(request, response);
        expect(res).to.be.an('error');
        expect(res).to.have.property('message', 'Código de ativo inválido');
      });
    });
    describe('se o ID existir, retorna os investimentos', () => {
      before(() => {
        request.params = 1;
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        sinon.stub(investmentsServices, 'getByAssetById').resolves([
          {
            codAtivo: 1,
            qntdeAtivo: 400,
            preco: '150',
          },
        ]);
      });
      after(() => {
        investmentsServices.getByAssetById.restore();
      });
      it('retorna o status code 200', async () => {
        await investmentsController.getByAssetById(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});
