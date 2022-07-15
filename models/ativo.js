const Ativo = (sequelize, DataTypes) => {
  const Ativo = sequelize.define('Ativo', {
    nome: DataTypes.STRING,
    qntAtivo: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL,
  });

  return Ativo;
};

module.exports = Ativo;
