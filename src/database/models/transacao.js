const TransactionSchema = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      qntMovimentada: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ativoId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Ativo',
          key: 'ativoId',
        },
      },
    },
    { timestamps: false },
  );

  Transaction.associate = (models) => {
    models.Ativo.belongsToMany(models.User, {
      as: 'ativo',
      through: 'Transaction',
      foreignKey: 'ativoId',
      otherKey: 'userId',
    });
    models.User.belongsToMany(models.Ativo, {
      as: 'user',
      through: 'Transaction',
      foreignKey: 'userId',
      otherKey: 'ativoId',
    });
  };

  return Transaction;
};

module.exports = TransactionSchema;
