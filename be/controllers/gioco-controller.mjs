import { Abstract_Controller } from "./abstract-controller.mjs";

class GiocoController extends Abstract_Controller {
  /**
   *
   * @param {Environment} env
   */
  constructor(env) {
    super(env, "gioco");
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
      let classifica = await this.env.pgModel.gioco.classifica();
      response.send(classifica);
    } catch (e) {
      next(e);
    }
  }
}

export { GiocoController };
