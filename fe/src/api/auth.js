import { ApiRequest } from "./request";

export class Auth {
  static async me() {
    return ApiRequest.get("auth/me", { authenticate: true });
  }

  static async logout() {
    return ApiRequest.post("auth/logout", { authenticate: true });
  }

  static async login(username, password) {
    return ApiRequest.post("auth/login", { data: { username, password } });
  }
}
