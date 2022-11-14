"use strict";

import { PgClientManager } from "../lib/index.mjs";
import { Gioco } from "./gioco.mjs";

class PgModels {
  /**
   *
   * @param {PgClientManager} connection
   */
  constructor(connection) {
    this.gioco = new Gioco(connection);
  }
}

export { PgModels };
