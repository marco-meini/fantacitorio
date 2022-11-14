"use strict";

import express, { json } from "express";
import { join } from "path";
import { GiocoController } from "./controllers/gioco-controller.mjs";
import { Environment } from "./environment.mjs";
import { HttpResponseStatus } from "./lib/index.mjs";

class App {
  constructor() {
    this.env = new Environment();
    this.express = express();
    this.express.use(json());
    const gioco = new GiocoController(this.env);
    this.express.use(join(this.env.config.root, gioco.route), gioco.router);
    this.express.use(join(this.env.config.root, "/healthcheck"), (request, response) => {
      response.send({ uptime: process.uptime() });
    });
    this.express.use(
      /**
       *
       * @param {any} error
       * @param {import("express").Request} request
       * @param {import("express").Response} response
       * @param {import("express").NextFunction} next
       */
      (error, request, response, next) => {
        if (!error) {
          next();
        } else if (error.name === "JsonWebTokenError") {
          this.env.logger.error(request.url, error.stack);
          response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
        } else {
          this.env.logger.error(request.url, error.stack);
          response.sendStatus(HttpResponseStatus.SERVER_ERROR);
        }
      }
    );
  }
}

export { App };
