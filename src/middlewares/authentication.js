const { authenticateToken } = require('../utils/JWT');

const authentication = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) throw new Error('Token inválido');
    if (token.startsWith('Bearer ')) {
      token = token.substring(7, token.length);
    }
    const payload = await authenticateToken(token);
    res.locals.payload = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

module.exports = { authentication };
