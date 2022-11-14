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
}

export { Gioco };
