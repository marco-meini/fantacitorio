import moment from "moment";
import { HttpResponseStatus } from "../lib/enums.mjs";
import { Result } from "../lib/result.mjs";
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
    this.router.get("/squadre", this.squadre.bind(this));
    this.router.put("/giornata", AuthenticationMiddleware.checkAuthentication(env), this.editGiornata.bind(this));
    this.router.get("/giornata/:puntata/punteggi", AuthenticationMiddleware.checkAuthentication(env), this.punteggiPuntata.bind(this));
    this.router.delete("/giornata/:puntata", AuthenticationMiddleware.checkAuthentication(env), this.deletePuntata.bind(this));
    this.router.get("/giornata/:puntata", this.puntata.bind(this));
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
  async squadre(request, response, next) {
    try {
      let squadre = await this.env.pgModel.gioco.squadre();
      response.send(squadre);
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
      let requestBody = request.body;
      let result = new Result("Giornata salvata", "Qualcosa non va:");

      let puntata = moment(requestBody.data, "YYYY-MM-DD");
      if (!puntata.isValid()) {
        result.addError("Data non valida");
      }

      if (requestBody.punteggi.length === 0) {
        result.addError("Inserire almeno un punteggio di un politico");
      } else {
        let punteggio0 = requestBody.punteggi.filter((item) => item.punteggio === 0).length;
        let noPolitico = requestBody.punteggi.filter((item) => !item.id).length;
        let counts = {};
        requestBody.punteggi.forEach((item) => {
          counts[item.id] = (counts[item.id] || 0) + 1;
        });
        let duplicates = false;
        for (let p in counts) {
          if (counts[p] > 1) duplicates = true;
        }
        if (punteggio0) {
          result.addError("Ci sono politici con punteggio 0");
        }
        if (noPolitico) {
          result.addError("Ci sono punteggi senza politico, duro!");
        }
        if (duplicates) {
          result.addError("Ci sono politici duplicati");
        }
      }

      if (result.success) {
        await this.env.pgModel.gioco.salvaGiornata(puntata, requestBody.punteggi);
        response.send(result.getResult());
      } else {
        response.status(HttpResponseStatus.BAD_PARAMS).send(result.getResult());
      }
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
  async punteggiPuntata(request, response, next) {
    try {
      let punteggi = await this.env.pgModel.gioco.punteggiGiornata(request.params.puntata);
      response.send(punteggi);
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
  async deletePuntata(request, response, next) {
    try {
      await this.env.pgModel.gioco.deleteGiornata(request.params.puntata);
      response.send();
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
  async puntata(request, response, next) {
    try {
      let puntata = await this.env.pgModel.gioco.puntata(request.params.puntata);
      response.send(puntata);
    } catch (e) {
      next(e);
    }
  }
}

export { GiocoController };
