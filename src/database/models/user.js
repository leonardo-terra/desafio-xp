const UserSchema = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.DECIMAL,
  });

  return User;
};

module.exports = UserSchema;
