const { authenticateToken } = require('../utils/JWT');

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token.startsWith('Bearer ')) {
      token = token.substring(7, token.length);
    }
    const payload = await authenticateToken(token);
    if (!payload) throw Error('Token not found');
    res.locals.payload = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

module.exports = { authentication };
