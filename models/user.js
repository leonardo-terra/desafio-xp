const UserSchema = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.DECIMAL,
  });

  return User;
};

module.exports = UserSchema;
