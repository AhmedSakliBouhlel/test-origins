const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const { jwtPrivateKey } = require('../../config/vars');

const auth = () => (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    return next();
  }
  const allowedPaths = ['/api/auth'];
  if (allowedPaths.some((path) => req.path.startsWith(path))) return next();
  const accessToken = req.cookies.accessToken || req.headers['x-auth-token'];
  if (!accessToken) {
    throw new APIError({
      message: 'No Access Token',
      status: httpStatus.UNAUTHORIZED,
    });
  }
  try {
    req.user = jwt.verify(accessToken, jwtPrivateKey);
    return next();
  } catch (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.UNAUTHORIZED,
    });
  }
};

module.exports = { auth };
