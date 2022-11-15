import { Crypt } from "../lib/crypt.mjs";
import { HttpResponseStatus } from "../lib/enums.mjs";
import { AuthenticationMiddleware } from "../middlewares/auth-middlewares.mjs";
import { Abstract_Controller } from "./abstract-controller.mjs";

class AuthController extends Abstract_Controller {
  constructor(env) {
    super(env, "auth");
    this.router.post("/login", this.login.bind(this));
    this.router.post("/logout", AuthenticationMiddleware.checkAuthentication(env), this.logout.bind(this));
    this.router.get("/me", AuthenticationMiddleware.checkAuthentication(env), this.me.bind(this));
  }

  /**
   *
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async login(request, response, next) {
    try {
      /**
       * @type {{
       * username: string,
       * password: string
       * }}
       */
      let _loginData = request.body;
      if (_loginData.username && _loginData.password) {
        let user = await this.env.pgModel.utenti.getByUsername(_loginData.username);
        if (user && user.password_ut) {
          let authenticated = await Crypt.compare(_loginData.password, user.password_ut);
          if (authenticated) {
            let session = await this.env.mongoModel.sessions.create(user, this.env.config.sessionMinutesLife);
            response.send(session);
          } else {
            response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
          }
        } else {
          response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
        }
      } else {
        response.sendStatus(HttpResponseStatus.BAD_PARAMS);
      }
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {import("../middlewares/auth-middlewares.mjs").SessionRequest} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async logout(request, response, next) {
    try {
      await this.env.mongoModel.sessions.delete(request.session.access_token);
      response.send();
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {import("../middlewares/auth-middlewares.mjs").SessionRequest} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  async me(request, response, next) {
    try {
      response.send(request.session);
    } catch (e) {
      next(e);
    }
  }
}

export { AuthController };
