const UserSchema = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.INTEGER,
  });

  return User;
};

module.exports = UserSchema;
