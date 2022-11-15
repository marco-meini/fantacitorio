import moment from "moment";
import { ObjectId } from "mongodb";
import { MongoClienManager } from "../../lib/mongo-client-manager.mjs";
import { Abstract_Collection } from "./abstract-collection.mjs";

/**
 * @typedef {{
 * access_token: string,
 * user: {
 *  id: number,
 *  name: string,
 *  admin: boolean
 * },
 * expire: number
 * }} ISession
 */

class Sessions extends Abstract_Collection {
  /**
   *
   * @param {MongoClienManager} connection
   */
  constructor(connection) {
    super(connection, "sessions");
  }

  /**
   *
   * @param {string} access_token
   * @returns {Promise<ISession>}
   */
  async find(access_token) {
    try {
      let session = await this.findBy_id(new ObjectId(access_token));
      if (session) {
        session.access_token = session._id;
        delete session._id;
      }
      return Promise.resolve(session);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {import("../postgres/utenti.mjs").IUser} user
   * @param {number} minutesLife
   * @returns {Promise<ISession>}
   */
  async create(user, minutesLife = 60) {
    try {
      /** @type {ISession} */
      let session = {
        user: {
          id: user.id_ut,
          name: user.name_ut,
          admin: user.admin_ut
        },
        expire: moment().add(minutesLife, "m").valueOf()
      };
      await this.addDocument(session);
      session.access_token = session._id;
      delete session._id;
      return Promise.resolve(session);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {string} access_token
   * @returns {Promise<ISession>}
   */
   async delete(access_token) {
    try {
      await this.deleteBy_id(new ObjectId(access_token));
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export { Sessions };
