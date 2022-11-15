import { ApiRequest } from "./request";

export class GiocoAPIs {
  static async getClassifica() {
    return await ApiRequest.get("gioco/classifica");
  }
}
