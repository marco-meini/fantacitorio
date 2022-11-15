import moment from "moment";
import { Environment } from "../environment.mjs";
import { HttpResponseStatus } from "../lib/enums.mjs";

/**
 * @typedef {import("express").Request & {session:import("../model/mongo/sessions.mjs").ISession}} SessionRequest
 */

class AuthenticationMiddleware {
  /**
   *
   * @param {Environment} env
   * @returns {import("express").RequestHandler}
   */
  static checkAuthentication(env) {
    return async (request, response, next) => {
      try {
        let authHeader = request.headers["authorization"];
        if (authHeader) {
          /** @type {string[]} */
          let tokenArray = authHeader.split(" ");
          if (tokenArray.length === 2) {
            let access_token = tokenArray[1];
            /** @type {import("../model/mongo/sessions.mjs").ISession} */
            let session = await env.mongoModel.sessions.find(access_token);
            if (session) {
              if (session.expire < moment().valueOf()) {
                await env.mongoModel.sessions.delete(access_token);
                response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
              } else {
                request.session = session;
                next();
              }
            } else {
              response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
            }
          } else {
            response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
          }
        } else {
          response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
        }
      } catch (e) {
        env.logger.error(e);
        response.sendStatus(HttpResponseStatus.NOT_AUTHENTICATED);
      }
    };
  }
}

export { AuthenticationMiddleware };
