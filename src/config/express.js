const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('../api/routes');
const error = require('../api/middlewares/error');
const { logs, frontHost } = require('./vars');

const corsOptions = {
  origin: frontHost,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan(logs));
app.use('/api', routes);

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = app;
