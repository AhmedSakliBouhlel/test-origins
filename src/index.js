/* eslint-disable no-console */
const app = require('./config/express');
const { port, env, host } = require('./config/vars');

console.time('app-start');

const server = app.listen(port, () => {
  console.info(`--- Started ${env} on ${host}:${port} ---`);
  console.timeEnd('app-start');
});

module.exports = server;
