import { ApiRequest } from "./request";

export class GiocoAPIs {
  static async getClassifica() {
    return await ApiRequest.get("gioco/classifica");
  }

  static async giornate() {
    return await ApiRequest.get("gioco/giornate");
  }

  static async politici() {
    return await ApiRequest.get("gioco/politici");
  }

  static async politiciSelect() {
    try {
      let politici = await ApiRequest.get("gioco/politici");
      return politici.map((item) => {
        return {
          label: item.nome_pl,
          code: item.id_pl
        };
      });
    } catch (e) {
      return Promise.resolve(e);
    }
  }
}
