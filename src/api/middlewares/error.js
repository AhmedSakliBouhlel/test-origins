/* eslint-disable no-unused-vars */

const httpStatus = require('http-status');
const { env } = require('../../config/vars');
const APIError = require('../utils/APIError');

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }
  console.error(response);
  res.sendStatus(err.status);
};

const converter = (err, req, res, next) => {
  let convertedError = err;
  if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message || 'No message',
      status: err.status || 500,
      stack: err.stack,
    });
  }
  return handler(convertedError, req, res);
};

const notFound = (req, res, next) => {
  const notFoundError = new Error(`Request path ${req.path} not found`);
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
    errors: notFoundError.message,
    stack: notFoundError.stack,
  });
  return handler(err, req, res);
};

module.exports.converter = converter;
module.exports.handler = handler;
module.exports.notFound = notFound;
