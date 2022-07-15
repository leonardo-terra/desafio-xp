const Ativo = (sequelize, DataTypes) => {
  const Ativo = sequelize.define('Ativo', {
    ativoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: DataTypes.STRING,
    qntAtivo: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL,
  });

  return Ativo;
};

module.exports = Ativo;
