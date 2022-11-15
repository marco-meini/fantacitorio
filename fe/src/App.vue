<template>
  <div class="container">
    <img src="@/assets/header.jpg" class="img-fluid" alt="..." />
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :class="{ active: activePage === 'home' }" class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :class="{ active: activePage === 'punteggi' }" class="nav-link" to="/punteggi">Punteggi</router-link>
            </li>
          </ul>
          <ul class="navbar-nav d-flex">
            <li v-if="!session.isAuthenticated" class="nav-link">
              <router-link to="/login" class="nav-link">Admin Login</router-link>
            </li>
            <li v-if="session.isAuthenticated" class="nav-link">
              <router-link class="nav-link" to="/#" @click="logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container px-5 py-3 text-bg-light">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { Auth } from "./api/auth";
import { sessionStore } from "./stores/session";

export default {
  setup() {
    const session = sessionStore();

    return { session };
  },
  computed: {
    activePage() {
      return this.$route.name;
    }
  },
  methods: {
    async checkAuthentication() {
      try {
        let user = await Auth.me();
        this.session.setSession(user);
      } catch (e) {
        this.session.setSession(null);
      }
    },
    async logout() {
      try {
        await Auth.logout();
        sessionStorage.removeItem("access_token");
        this.session.setSession(null);
      } catch (e) {
        console.error(e);
      }
    }
  },
  created() {
    this.checkAuthentication();
  }
};
</script>
