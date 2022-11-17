<template>
  <div>
    <PageTitle title="Login" />
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
      <button v-if="!loading" type="button" class="btn btn-primary" @click="login">Login</button>
      <Loading :loading="loading" />
    </form>
  </div>
</template>

<script>
import { Auth } from "../api/auth";
import PageTitle from "../components/PageTitle.vue";
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
            if (this.session.isAuthenticated)
                this.$router.replace({ path: "/" });
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
            }
            catch (e) {
                console.error(e);
                this.error = true;
            }
            this.loading = false;
        }
    },
    created() {
        this.init();
    },
    components: { PageTitle }
};
</script>
