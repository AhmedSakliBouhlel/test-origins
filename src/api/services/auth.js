const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const APIError = require('../utils/APIError');
const User = require('../models/user');
const { jwtPrivateKey } = require('../../config/vars');

const refresh = async (cookies) => {
  try {
    const { refreshToken } = cookies;
    const payload = jwt.verify(refreshToken, jwtPrivateKey);
    const [user] = await User.find({ 'user.id': payload.id });
    const accessToken = user.generateAccessToken();
    const newCookies = {
      refreshCookie: user.generateRefreshCookie(),
      accessCookie: user.generateAccessCookie(),
    };
    return { accessToken, newCookies };
  } catch (e) {
    throw new APIError({
      message: 'Refresh Token expired',
      status: httpStatus.UNAUTHORIZED,
    });
  }
};

const login = async (body) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
    ,
  });
  const { error } = schema.validate(body, { presence: 'required' });
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }
  const { email, password } = body;
  const [user] = await User.find({ email });
  if (!user) {
    throw new APIError({
      message: 'Invalid email',
      status: httpStatus.BAD_REQUEST,
    });
  }
  if (password !== user.password) {
    throw new APIError({
      message: 'Invalid password',
      status: httpStatus.BAD_REQUEST,
    });
  }
  const accessToken = user.generateAccessToken();
  const cookies = {
    refreshCookie: user.generateRefreshCookie(),
    accessCookie: user.generateAccessCookie(),
  };
  return { accessToken, cookies };
};

const signup = async (body) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string(),
  });
  const { error } = schema.validate(body, { presence: 'required' });
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }
  const {
    email, firstName, lastName, password,
  } = body;
  let [user] = await User.find({ email });
  if (user) {
    throw new APIError({
      message: 'User already exist',
      status: httpStatus.CONFLICT,
    });
  }
  user = new User({
    password,
    firstName,
    lastName,
    email,
  });
  user = await user.insert();
  return user;
};

module.exports = { login, refresh, signup };
