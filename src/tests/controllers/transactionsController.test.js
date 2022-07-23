const sinon = require('sinon');
const { expect } = require('chai');

const transactionsController = require('../../controller/transactions.controller');
const transactionsServices = require('../../services/transactions.services');

describe('Ao realizar consulta de transações', () => {
  describe('por todas as transações disponíveis', async () => {
    const response = {};
    const request = {};
    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsServices, 'getAll').resolves([
        {
          transactionId: 1,
          codCliente: 2,
          qntdeAtivo: 20,
          preco: '250',
          codAtivo: 1,
        },
        {
          transactionId: 2,
          codCliente: 1,
          qntdeAtivo: 23,
          preco: '230',
          codAtivo: 1,
        },
        {
          transactionId: 3,
          codCliente: 3,
          qntdeAtivo: 50,
          preco: '200',
          codAtivo: 2,
        },
        {
          transactionId: 4,
          codCliente: 2,
          qntdeAtivo: 40,
          preco: '140',
          codAtivo: 2,
        },
        {
          transactionId: 5,
          codCliente: 3,
          qntdeAtivo: 2,
          preco: '120',
          codAtivo: 3,
        },
      ]);
    }),
      after(() => {
        transactionsServices.getAll.restore();
      });

    it('deve retornar status 200', async () => {
      await transactionsController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('por ID do cliente', () => {
    const response = {};
    const request = {};
    describe('quando o ID não é valido', async () => {
      before(() => {
        request.params = 12;
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
      });
      after(() => {
        transactionsController.getByClientID.restore();
      });
      sinon.stub(transactionsController, 'getByClientID').resolves(new Error('Cliente não encontrado'));
      it('lança uma exceção com a mensagem "Cliente não encontrado"', async () => {
        const res = await transactionsController.getByClientID(request, response);
        expect(res).to.be.an('error');
        expect(res).to.have.property('message', 'Cliente não encontrado');
      });
    });
    describe('se o ID existir, retorna as transações', () => {
      before(() => {
        request.params = 1;
        response.status = sinon.stub().returns(response);
        response.send = sinon.stub().returns();
        sinon.stub(transactionsServices, 'getByClientID').resolves([
          {
            codCliente: 1,
            codAtivo: 1,
            qntdeAtivo: 23,
            preco: '230',
          },
        ]);
      });
      after(() => {
        sinon.stub(transactionsServices.getByClientID.restore());
      });
      it('retorna o status code 200', async () => {
        await transactionsController.getByClientID(request, response);
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
    });
  });
});

describe('Ao consultar o saldo do cliente pelo seu ID', () => {
  const response = {};
  const request = {};
  describe('Se o ID não existir', () => {
    before(() => {
      request.params = 22;
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(transactionsController, 'getBalanceByClientID').resolves(new Error('Cliente não encontrado'));
    });
    after(() => {
      transactionsController.getBalanceByClientID.restore();
    });

    it('lança uma exceção com a mensagem "Cliente não encontrado"', async () => {
      const res = await transactionsController.getBalanceByClientID(request, response);
      expect(res).to.be.an('error');
      expect(res).to.have.property('message', 'Cliente não encontrado');
    });
  });
  describe('Se o ID existir', () => {
    before(() => {
      request.params = 1;
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsServices, 'getBalanceByClientID').resolves({
        codCliente: 1,
        saldo: 150,
      });
    });
    after(() => {
      transactionsServices.getBalanceByClientID.restore();
    });
    it('retorna o status code 200', async () => {
      await transactionsController.getBalanceByClientID(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Ao realizar uma nova compra', () => {
  const response = {};
  const request = {};
  describe('com o payload incorreto', () => {
    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsController, 'newPurchase').resolves(new Error('Preenchimento incorreto'));
    });
    after(() => {
      transactionsController.newPurchase.restore();
    });
    it('lança uma exceção com a mensagem "Preenchimento incorreto"', async () => {
      const res = await transactionsController.newPurchase(request, response);
      expect(res).to.be.an('error');
      expect(res).to.have.property('message', 'Preenchimento incorreto');
    });
  });
  describe('ao realizar compra com payload preenchido', () => {
    before(() => {
      request.body = {
        codCliente: 1,
        codAtivo: 2,
        qntdeAtivo: 1,
      };
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsServices, 'newPurchase').resolves({
        codCliente: 1,
        codAtivo: 2,
        qtdeAtivo: 1,
      });
    });
    after(() => {
      transactionsServices.newPurchase.restore();
    });
    it('retorna o status code 201', async () => {
      await transactionsController.newPurchase(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('ao realizar compra com saldo insuficiente', () => {
    before(() => {
      request.body = {
        codCliente: 1,
        codAtivo: 2,
        qntdeAtivo: 1,
      };
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsController, 'newPurchase').resolves(new Error('Saldo insuficiente'));
    });
    after(() => {
      transactionsController.newPurchase.restore();
    });
    it('lança uma exceção com a mensagem "Saldo insuficiente"', async () => {
      const res = await transactionsController.newPurchase(request, response);
      expect(res).to.be.an('error');
      expect(res).to.have.property('message', 'Saldo insuficiente');
    });
  });
});

describe('Ao realizar uma nova compra', () => {
  const response = {};
  const request = {};
  describe('com o payload incorreto', () => {
    before(() => {
      request.body = {};
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsController, 'newPurchase').resolves(new Error('Preenchimento incorreto'));
    });
    after(() => {
      transactionsController.newPurchase.restore();
    });
    it('lança uma exceção com a mensagem "Preenchimento incorreto"', async () => {
      const res = await transactionsController.newPurchase(request, response);
      expect(res).to.be.an('error');
      expect(res).to.have.property('message', 'Preenchimento incorreto');
    });
  });
  describe('ao realizar venda com payload preenchido', () => {
    before(() => {
      request.body = {
        codCliente: 1,
        codAtivo: 2,
        qntdeAtivo: 1,
      };
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsServices, 'newSale').resolves({
        codCliente: 1,
        codAtivo: 2,
        qtdeAtivo: 1,
      });
    });
    after(() => {
      transactionsServices.newSale.restore();
    });
    it('retorna o status code 201', async () => {
      await transactionsController.newSale(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('ao realizar venda com quantidade insuficiente', () => {
    before(() => {
      request.body = {
        codCliente: 1,
        codAtivo: 2,
        qntdeAtivo: 1,
      };
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(transactionsController, 'newSale').resolves(new Error('Quantidade insuficiente'));
    });
    after(() => {
      transactionsController.newSale.restore();
    });
    it('lança uma exceção com a mensagem "Saldo insuficiente"', async () => {
      const res = await transactionsController.newSale(request, response);
      expect(res).to.be.an('error');
      expect(res).to.have.property('message', 'Quantidade insuficiente');
    });
  });
});
