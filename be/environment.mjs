"use strict";

import { PgClientManager, Logger } from "./lib/index.mjs";
import config from "./config/config.mjs";
import { PgModels } from "./model/pg-models.mjs";

/**
 * @typedef {object} Config
 * @property {number} port
 * @property {import("pg").PoolConfig} db
 * @property {number} logLevel
 * @property {string} root
 */

class ExpressError extends Error {
  /** @type {number} */
  status;
}

class Environment {
  constructor() {
    /** @type {Config} */
    this.config = config;
    this.logger = new Logger(this.config.logLevel);
    this.connection = new PgClientManager(this.config.db, this.logger.sql.bind(this.logger));
    this.pgModels = new PgModels(this.connection);
  }
}

export { ExpressError, Environment };
