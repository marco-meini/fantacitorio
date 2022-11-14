import { defineStore } from "pinia";

export const giocoStore = defineStore("session", {
  state: () => ({ user: null }),
  getters: {
    getSessionUser: (state) => state.user
  },
  actions: {}
});
