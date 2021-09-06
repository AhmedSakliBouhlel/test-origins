const httpStatus = require('http-status');
const authService = require('../services/auth');

const refresh = async (req, res) => {
  const accessData = await authService.refresh(req.cookies);
  res.cookie(...accessData.newCookies.refreshCookie);
  res.cookie(...accessData.newCookies.accessCookie);
  return res.status(httpStatus.OK).json(accessData.accessToken);
};

const login = async (req, res) => {
  const accessData = await authService.login(req.body);
  res.cookie(...accessData.cookies.refreshCookie);
  res.cookie(...accessData.cookies.accessCookie);
  return res.status(httpStatus.OK).json(accessData.accessToken);
};

const logout = (req, res) => {
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  res.clearCookie('accessToken');
  return res.sendStatus(httpStatus.OK);
};

const signup = async (req, res) => {
  const user = await authService.signup(req.body);
  return res.status(httpStatus.OK).json(user);
};

module.exports = {
  login, logout, refresh, signup,
};
