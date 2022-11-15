import { MongoClienManager } from "../../lib/mongo-client-manager.mjs";
import { Sessions } from "./sessions.mjs";

class MongoModel {
  /**
   *
   * @param {MongoClienManager} connection
   */
  constructor(connection) {
    /** @type {MongoClienManager} */
    this.connection = connection;
    this.sessions = new Sessions(connection);
  }
}

export { MongoModel };
