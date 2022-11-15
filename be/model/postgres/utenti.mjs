import { Abstract_PgModel } from "./abstract-pg-model.mjs";

/**
 * @typedef {{
 * id_ut: number,
 * username_ut: string,
 * password_ut: string,
 * admin_ut: boolean,
 * name_ut: string
 * }} IUser
 */

class Utenti extends Abstract_PgModel {
  /**
   *
   * @param {string} username
   * @returns {Promise<IUser>}
   */
  async getByUsername(username) {
    try {
      return this.__connection.queryReturnFirst({ sql: "select * from utenti where username_ut=$1", replacements: [username] });
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export { Utenti };
