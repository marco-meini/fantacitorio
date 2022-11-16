import { ApiRequest } from "./request";

export class Auth {
  static async me() {
    try {
      let response = await ApiRequest.get("auth/me", { authenticate: true });
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`auth/me responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async logout() {
    try {
      let response = await ApiRequest.post("auth/logout", { authenticate: true });
      if (response.status < 400) {
        return Promise.resolve();
      } else {
        return Promise.reject(`auth/logout responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  static async login(username, password) {
    try {
      let response = await ApiRequest.post("auth/login", { data: { username, password } });
      if (response.status < 400) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`auth/login responds with status ${response.status}`);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
