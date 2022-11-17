import { ApiRequest } from "./request";

export class GiocoAPIs {
  static async getClassifica() {
    try {
      let response = await ApiRequest.get("gioco/classifica");
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`gioco/classifica responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async giornate() {
    try {
      let response = await ApiRequest.get("gioco/giornate");
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`"gioco/giornate responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async politici() {
    try {
      let response = await ApiRequest.get("gioco/politici");
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`gioco/politici responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async squadre() {
    try {
      let response = await ApiRequest.get("gioco/squadre");
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`gioco/squadre responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async politiciSelect() {
    try {
      let response = await ApiRequest.get("gioco/politici");
      if (response.status < 400) {
        return response.data.map((item) => {
          return {
            label: item.nome_pl,
            code: item.id_pl
          };
        });
      } else {
        return Promise.reject(`gioco/politici (select) responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.resolve(e);
    }
  }

  static async saveGiornata(giornata) {
    try {
      let response = await ApiRequest.put("gioco/giornata", { authenticate: true, data: giornata });
      if (response.status < 400 || response.status === 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`gioco/giornata responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
