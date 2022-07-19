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

  Ativo.associate = (models) => {
    Ativo.hasMany(models.Transaction, {
      foreignKey: 'ativoId',
      as: 'transactions',
    });
  };

  return Ativo;
};

module.exports = Ativo;
