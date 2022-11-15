import { defineStore } from "pinia";

export const sessionStore = defineStore("session", {
  state: () => ({ user: null }),
  getters: {
    getSessionUser: (state) => state.user,
    isAuthenticated: (state) => (state.user ? true : false)
  },
  actions: {}
});
