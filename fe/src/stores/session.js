import { defineStore } from "pinia";

export const sessionStore = defineStore("session", {
  state: () => ({ user: null, loaded: false }),
  getters: {
    isAuthenticated: (state) => (state.user ? true : false)
  },
  actions: {
    setSession(user) {
      this.user = user;
      this.loaded = true;
    }
  }
});
