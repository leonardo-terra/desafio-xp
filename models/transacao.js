const TransacaoSchema = (sequelize, DataTypes) => {
  const Transacao = sequelize.define(
    'Transacao',
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'userId',
        },
      },
      qntMovimentada: { type: DataTypes.INTEGER, allowNull: false },

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
  Ativo.belongsToMany(User, { through: 'Transacao' });
  User.belongsToMany(Ativo, { through: 'Transacao' });

  return Transacao;
};

module.exports = TransacaoSchema;

/* Transacao.associate = (models) => {
    models.Ativo.belongsToMany(models.User, {
      as: 'ativo',
      through: 'Transacao',
      foreignKey: 'ativoId',
      otherKey: 'userId',
    });
    models.User.belongsToMany(models.Ativo, {
      as: 'user',
      through: 'Transacao',
      foreignKey: 'userId',
      otherKey: 'ativoId',
    });
  }; */
