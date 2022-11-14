import axios from "axios";

export class GiocoAPIs {
  static async getClassifica() {
    try {
      let response = await axios.get("/api/v1/gioco/classifica");
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(new Error(`Error ${response.status} calling api`));
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
