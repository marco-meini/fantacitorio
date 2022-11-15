"use strict";

import { PgClientManager } from "./lib/pg-client-manager.mjs";
import { Logger } from "./lib/logger.mjs";
import config from "./config/config.mjs";
import { PgModel } from "./model/postgres/pg-model.mjs";
import { MongoModel } from "./model/mongo/mongo-model.mjs";
import { MongoClienManager } from "./lib/mongo-client-manager.mjs";

/**
 * @typedef {{
 * port: number,
 * db: import("pg").PoolConfig,
 * logLevel: number,
 * root: string,
 * mongo: {
 *  dbconfig: import("./lib/mongo-client-manager.mjs").MongoDbConfig,
 *  options: import("mongodb").MongoClientOptions
 * },
 * sessionMinutesLife: number
 * }} Config
 */

class ExpressError extends Error {
  /** @type {number} */
  status;
}

class Environment {
  /**
   * @type {MongoModel}
   */
  mongoModel;

  constructor() {
    /** @type {Config} */
    this.config = config;
    /** @type {Logger} */
    this.logger = new Logger(this.config.logLevel);
    /** @type {PgModel} */
    this.pgModel = new PgModel(new PgClientManager(this.config.db, this.logger.sql.bind(this.logger)));
  }

  async initMongoModel() {
    let connection = new MongoClienManager(this.config.mongo.dbconfig, this.config.mongo.options);
    await connection.connect();
    this.mongoModel = new MongoModel(connection);
  }
}

export { ExpressError, Environment };
