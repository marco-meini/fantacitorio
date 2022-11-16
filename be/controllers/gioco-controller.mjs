import moment from "moment";
import { HttpResponseStatus } from "../lib/enums.mjs";
import { AuthenticationMiddleware } from "../middlewares/auth-middlewares.mjs";
import { Abstract_Controller } from "./abstract-controller.mjs";

class GiocoController extends Abstract_Controller {
  /**
   *
   * @param {Environment} env
   */
  constructor(env) {
    super(env, "gioco");
    this.router.get("/classifica", this.classifica.bind(this));
    this.router.get("/giornate", this.giornate.bind(this));
    this.router.get("/politici", this.politici.bind(this));
    this.router.put("/giornata", AuthenticationMiddleware.checkAuthentication(env), this.editGiornata.bind(this));
  }

  /**
   *
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async classifica(request, response, next) {
    try {
      let classifica = await this.env.pgModel.gioco.classifica();
      response.send(classifica);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async giornate(request, response, next) {
    try {
      let giornate = await this.env.pgModel.gioco.giornate();
      response.send(giornate);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async politici(request, response, next) {
    try {
      let politici = await this.env.pgModel.gioco.politici();
      response.send(politici);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async editGiornata(request, response, next) {
    try {
      /**
       * @type {{
       * data: string,
       * punteggi: Array<{id: number, punteggio: number}>
       * }}
       */
      let data = request.body;
      let result = { success: true, description: "Giornata salvata", messages: [] };

      let date = moment(data.data, "YYYY-MM-DD");
      if (!date.isValid()) {
        result.success = false;
        result.messages.push("Data non valida");
      }

      if (data.punteggi.length === 0) {
        result.success = false;
        result.messages.push("Inserire almeno un punteggio di un politico");
      } else {
        let punteggio0 = data.punteggi.filter((item) => item.punteggio === 0).length;
        let counts = {};
        data.punteggi.forEach((item) => {
          counts[item.id] = (counts[item.id] || 0) + 1;
        });
        let duplicates = false;
        for (let p in counts) {
          if (counts[p] > 1) duplicates = true;
        }
        if (punteggio0) {
          result.success = false;
          result.messages.push("Ci sono politici con punteggio 0");
        }
        if (duplicates) {
          result.success = false;
          result.messages.push("Ci sono politici duplicati");
        }
      }

      if (result.success) {
        response.send(result);
      } else {
        result.description = "Qualcosa non va:";
        response.status(HttpResponseStatus.BAD_PARAMS).send(result);
      }
    } catch (e) {
      next(e);
    }
  }
}

export { GiocoController };
