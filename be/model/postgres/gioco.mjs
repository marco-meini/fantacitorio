import moment from "moment";
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

  async squadre() {
    try {
      let output = [];
      let resultSquadre = await this.__connection.query({ sql: "SELECT id_sq as id,nome_sq as nome, giocatore_sq as giocatore FROM squadre order by nome_sq" });
      if (resultSquadre.rowCount) {
        for (let squadra of resultSquadre.rows) {
          let sql = `SELECT id_pl as id
          , nome_pl as nome
          , leader_sp as leader
          FROM squadre_politici sp
          INNER JOIN politici pl
            on sp.id_politico_sp=pl.id_pl
          WHERE sp.id_squadra_sp=$1
          ORDER BY leader_sp desc, nome_pl`;
          let resultPolitici = await this.__connection.query({ sql: sql, replacements: [squadra.id] });
          output.push({
            ...squadra,
            politici: resultPolitici.rows
          });
        }
      }
      return Promise.resolve(output);
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
      await this.__connection.query({ sql: "delete from punteggi where puntata_pn=$1", replacements: [moment(giornata).format("YYYYMMDD")] });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   *
   * @param {import("moment").Moment} data
   * @param {Array<{id: number, punteggio: number}} punteggi
   * @returns
   */
  async salvaGiornata(data, punteggi) {
    try {
      let tc = await this.__connection.startTransaction();
      try {
        // delete previous data
        await this.__connection.query({ sql: "delete from punteggi where puntata_pn=$1", replacements: [data.format("YYYYMMDD")], transactionClient: tc });
        // insert new data
        for (let punteggio of punteggi) {
          await this.__connection.query({
            sql: "insert into punteggi (puntata_pn,id_politico_pn,punteggio_pn) values ($1,$2,$3)",
            replacements: [data.format("YYYYMMDD"), punteggio.id, punteggio.punteggio],
            transactionClient: tc
          });
        }
        await this.__connection.commit(tc);
        return Promise.resolve();
      } catch (e) {
        await this.__connection.rollback(tc);
        throw e;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

export { Gioco };
