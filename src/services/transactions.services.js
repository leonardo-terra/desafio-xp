const { User } = require('../database/models');

const getAll = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  console.log(result);
  return result;
};

module.exports = {
  getAll,
};
