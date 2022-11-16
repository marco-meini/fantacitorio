import { Abstract_PgModel } from "./abstract-pg-model.mjs";

/**
 * @typedef {{
 * id_sq: number,
 * nome_sq: string,
 * giocatore_sq: string,
 * punteggio: number
 * }} IClassifica
 */

class Gioco extends Abstract_PgModel {
  /**
   *
   * @returns {Promise<IClassifica>}
   */
  async classifica() {
    try {
      let sql = `select sq.*
      , coalesce(punteggio,0) as punteggio
      from squadre sq
      left join lateral (
          select sum(pn.punteggio_pn) as punteggio
          from squadre_politici sp
          inner join punteggi pn on sp.id_politico_sp=pn.id_politico_pn
          where sp.id_squadra_sp=sq.id_sq
      ) cl on true
      order by punteggio desc`;
      let result = await this.__connection.query({ sql: sql });
      return Promise.resolve(result.rows);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async giornate() {
    try {
      let result = await this.__connection.query({ sql: "select distinct puntata_pn from punteggi" });
      return Promise.resolve(result.rows);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async politici() {
    try {
      let result = await this.__connection.query({ sql: "select * from politici order by nome_pl" });
      return Promise.resolve(result.rows);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * 
   * @param {string} giornata 
   * @returns 
   */
  async deleteGiornata(giornata) {
    try {
      await this.__connection.query({ sql: "delete punteggi whwre puntata_pn=$1", replacements: [giornata] });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export { Gioco };
