const path = require('path');
require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  example: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true,
});

const { env } = process;
module.exports = {
  env: env.NODE_ENV,
  port: env.PORT,
  host: env.HOST,
  logs: env.LOGS,
  postgresHost: env.POSTGRES_HOST,
  postgresPort: env.POSTGRES_PORT,
  postgresUser: env.POSTGRES_USER,
  postgresPassword: env.POSTGRES_PASSWORD,
  postgresDatabase: env.POSTGRES_DATABASE,
  jwtPrivateKey: env.JWT_PRIVATE_KEY,
};
