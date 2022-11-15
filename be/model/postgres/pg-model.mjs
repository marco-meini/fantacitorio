"use strict";

import { PgClientManager } from "../../lib/pg-client-manager.mjs";
import { Gioco } from "./gioco.mjs";
import { Utenti } from "./utenti.mjs";

class PgModel {
  /**
   *
   * @param {PgClientManager} connection
   */
  constructor(connection) {
    this.connection = connection;
    this.gioco = new Gioco(connection);
    this.utenti = new Utenti(connection);
  }

  async disconnect() {
    return this.connection.disconnect();
  }
}

export { PgModel };
