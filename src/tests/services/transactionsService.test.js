const sinon = require('sinon');
const { expect } = require('chai');
const transactionsService = require('../../services/transactions.services');

describe('Busca por uma transação', () => {
  describe('pelo ID do cliente, quando ela não existe', () => {
    before(() => {
      sinon
        .stub(transactionsService, 'getByClientID')
        .resolves(new Error('Cliente não encontrado'));
    });
    after(() => {
      transactionsService.getByClientID.restore();
    });
    it('Retorna uma exceção com a mensagem "Cliente não encontrado"', async () => {
      const TEST_ID = 1;
      const response = await transactionsService.getByClientID(TEST_ID);
      expect(response).to.an('error');
      expect(response).to.have.property('message', 'Cliente não encontrado');
    });
  });
  describe('pelo ID do cliente, quando ela existe', () => {
    before(() => {
      sinon.stub(transactionsService, 'getByClientID').resolves([
        {
          codCliente: 1,
          codAtivo: 1,
          qntdeAtivo: 23,
          preco: '230',
        },
      ]);
    });
    after(() => {
      transactionsService.getByClientID.restore();
    });
    it('retorna os dados das ações do cliente em um array', async () => {
      const TEST_ID = 1;
      const response = await transactionsService.getByClientID(TEST_ID);
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
      expect(response[0]).to.have.property('codCliente');
      expect(response[0]).to.have.property('codAtivo');
      expect(response[0]).to.have.property('qntdeAtivo');
      expect(response[0]).to.have.property('preco');
      expect(response[0].codCliente).to.be.equal(TEST_ID);
      expect(response[0].qntdeAtivo).to.be.equal(23);
      expect(response[0].preco).to.be.equal('230');
    });
  });
  describe('todas as transações', () => {
    before(() => {
      sinon.stub(transactionsService, 'getAll').resolves([
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
    });
    after(() => {
      transactionsService.getAll.restore();
    });
    it('retorna os dados de todas as transações', async () => {
      const response = await transactionsService.getAll();
      expect(response).to.be.an('array');
      expect(response[0]).to.be.an('object');
      expect(response[0]).to.have.property('transactionId');
      expect(response[0]).to.have.property('codCliente');
      expect(response[0]).to.have.property('qntdeAtivo');
      expect(response[0]).to.have.property('preco');
      expect(response[0]).to.have.property('codAtivo');
      expect(response[0].transactionId).to.be.equal(1);
      expect(response[0].codCliente).to.be.equal(2);
      expect(response[0].qntdeAtivo).to.be.equal(20);
      expect(response[0].preco).to.be.equal('250');
      expect(response[0].codAtivo).to.be.equal(1);
    });
  });
});

describe('Busca saldo de cliente por ID', () => {
  describe('quando o cliente não existe', () => {
    before(() => {
      sinon
        .stub(transactionsService, 'getBalanceByClientID')
        .resolves(new Error('Cliente não encontrado'));
    });
    after(() => {
      transactionsService.getBalanceByClientID.restore();
    });
    it('Retorna uma exceção com a mensagem "Cliente não encontrado"', async () => {
      const TEST_ID = 1;
      const response = await transactionsService.getBalanceByClientID(TEST_ID);
      expect(response).to.an('error');
      expect(response).to.have.property('message', 'Cliente não encontrado');
    });
  });
  describe('quando o cliente existe', () => {
    before(() => {
      sinon.stub(transactionsService, 'getBalanceByClientID').resolves({
        codCliente: 1,
        saldo: 1150,
      });
    });
    after(() => {
      transactionsService.getBalanceByClientID.restore();
    });
    it('retorna o saldo do cliente', async () => {
      const TEST_ID = 1;
      const response = await transactionsService.getBalanceByClientID(TEST_ID);
      expect(response).to.be.an('object');
      expect(response).to.have.property('codCliente');
      expect(response).to.have.property('saldo');
      expect(response.codCliente).to.be.equal(TEST_ID);
      expect(response.saldo).to.be.equal(1150);
    });
  });
});

describe('Realiza compras', () => {
  describe('quando o saldo não é suficiente', () => {
    before(() => {
      sinon.stub(transactionsService, 'newPurchase').resolves(new Error('Saldo insuficiente'));
    });
    after(() => {
      transactionsService.newPurchase.restore();
    });
    it('Retorna uma exceção com a mensagem "Saldo insuficiente"', async () => {
      const TEST_ID = 1;
      const response = await transactionsService.newPurchase(TEST_ID);
      expect(response).to.an('error');
      expect(response).to.have.property('message', 'Saldo insuficiente');
    });
  });
  describe('quando a quantidade não está disponível para venda', () => {
    before(() => {
      sinon
        .stub(transactionsService, 'newPurchase')
        .resolves(new Error('Quantidade requerida indisponível'));
    });
    after(() => {
      transactionsService.newPurchase.restore();
    });
    it('Retorna uma exceção com a mensagem "Quantidade requerida indisponível"', async () => {
      const TEST_ID = 1;
      const response = await transactionsService.newPurchase(TEST_ID);
      expect(response).to.an('error');
      expect(response).to.have.property('message', 'Quantidade requerida indisponível');
    });
  });
  describe('quando efetuada, retorna os dados da compra', async () => {
    before(() => {
      sinon.stub(transactionsService, 'newPurchase').resolves({
        codCliente: 3,
        codAtivo: 2,
        qtdeAtivo: 10,
      });
    });
    after(() => {
      transactionsService.newPurchase.restore();
    });
    const TEST_ID = 1;
    const response = await transactionsService.newPurchase(TEST_ID);
    expect(response).to.be.an('object');
    expect(response).to.have.property('codCliente');
    expect(response).to.have.property('codAtivo');
    expect(response).to.have.property('qntdeAtivo');
    expect(response.codCliente).to.be.equal(TEST_ID);
    expect(response.codAtivo).to.be.equal(2);
    expect(response.qntdeAtivo).to.be.equal(10);
  });
});
