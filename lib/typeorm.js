'use strict';
require('reflect-metadata');
const assert = require('assert');
const typeorm = require('typeorm');

let count = 0;
module.exports = app => {
  app.addSingleton('typeorm', async (config, app) => {
    assert(config.type && config.database,
      `[egg-typeorm] 'host: ${config.type}', 'database: ${config.database}' are required on config`);

    assert((config.username && config.host) || config.replication,
      `[egg-typeorm] 'username: ${config.username}', 'host: ${config.host}' are required on config`);

    const connection = await typeorm.createConnection(config);

    app.beforeStart(() => {
      const index = count++;
      app.coreLogger.info(`[egg-typeorm] instance[${index}] status OK`);
    });

    return connection;
  });
};
