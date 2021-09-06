const camelCase = require('camelcase');
const decamelize = require('decamelize');

const {
  postgresHost, postgresPort, postgresUser, postgresPassword, postgresDatabase,
} = require('./vars');

const camelcaseOverloaded = (result) => {
  try {
    if (!result) {
      return result;
    }
    if (typeof result === 'string' || result instanceof String) {
      return camelCase(result);
    }
    if (result.constructor === Object || result.constructor.name === 'RowDataPacket') {
      const output = {};
      Object.entries(result).forEach(([key, value]) => {
        const camelcased = camelCase(key);
        output[camelcased] = value;
      });
      return output;
    }
    if (Array.isArray(result)) {
      const output = [];
      result.forEach((element) => {
        output.push(camelcaseOverloaded(element));
      });
      return output;
    }
    return result;
  } catch (error) {
    return result;
  }
};

module.exports = {
  client: 'postgres',
  connection: {
    host: postgresHost,
    port: postgresPort,
    user: postgresUser,
    password: postgresPassword,
    database: postgresDatabase,
  },

  postProcessResponse: camelcaseOverloaded,
  wrapIdentifier: (value, origImpl) => origImpl(decamelize(value)),
  debug: false,
};
