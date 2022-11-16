import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PageTitle from "./components/PageTitle.vue";
import Loading from "./components/Loading.vue";
import GenericError from "./components/GenericError.vue";
import Result from "./components/Result.vue";
import vSelect from "vue-select";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/main.css";
import 'vue-select/dist/vue-select.css';

const app = createApp(App);

app.component("PageTitle", PageTitle);
app.component("Loading", Loading);
app.component("GenericError", GenericError);
app.component("Result", Result);
app.component("v-select", vSelect);

app.use(createPinia());
app.use(router);

app.mount("#app");
