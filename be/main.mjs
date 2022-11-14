"use strict";

import { App } from "./app.mjs";

const app = new App();
let port = app.env.config.port || 9201;

(async () => {
  app.express.listen(port, () => {
    app.env.logger.info("### Server started on port", port.toString(), " ###");
  });
})();

process.on("beforeExit", () => {
  app.env.connection.disconnect();
});
