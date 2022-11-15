<template>
  <div>
    <h1 class="mb-4">Login</h1>
    <form class="col-lg-6">
      <div class="alert alert-danger mb-4" v-if="error" role="alert">Autenticazione fallita</div>
      <div class="form-floating mb-3">
        <input type="text" v-model="username" class="form-control" id="userInput" placeholder="-" />
        <label for="userInput">username</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" v-model="password" class="form-control" id="passwordInput" placeholder="-" />
        <label for="passwordInput">password</label>
      </div>
      <button type="button" class="btn btn-primary" @click="login">Login</button>
    </form>
  </div>
</template>

<script>
import { Auth } from "../api/auth";
import { sessionStore } from "../stores/session";

export default {
  setup() {
    const session = sessionStore();

    return { session };
  },
  data: () => ({
    loading: false,
    username: null,
    password: null,
    error: false
  }),
  methods: {
    init() {
      console.info(this.session.isAuthenticated);
      if (this.session.isAuthenticated) this.$router.replace({ path: "/" });
      this.loading = false;
      this.username = null;
      this.password = null;
      this.error = null;
    },
    async login() {
      try {
        this.loading = true;
        this.error = false;
        let session = await Auth.login(this.username, this.password);
        if (session && session.access_token && session.user) {
          sessionStorage.setItem("access_token", session.access_token);
          this.session.setSession(session.user);
          this.$router.replace({ path: "/" });
        }
      } catch (e) {
        console.error(e);
        this.error = true;
      }
      this.loading = false;
    }
  },
  created() {
    this.init();
  }
};
</script>
