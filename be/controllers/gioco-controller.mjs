import * as express from "express";
import { Environment } from "../environment.mjs";

export class GiocoController {
  /**
   * @type {express.Router}
   */
  router;
  /**
   * @type {Environment}
   * @private
   */
  env;
  /**
   * @type {string}
   */
  route;

  /**
   *
   * @param {Environment} env
   */
  constructor(env) {
    this.env = env;
    this.route = "gioco";
    this.router = express.Router();
    this.router.get("/classifica", this.classifica.bind(this));
  }

  /**
   *
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async classifica(request, response, next) {
    try {
      let classifica = await this.env.pgModels.gioco.classifica();
      response.send(classifica);
    } catch (e) {
      next(e);
    }
  }
}
