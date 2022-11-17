import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/main.css";
import 'vue-select/dist/vue-select.css';

const app = createApp(App);

app.component("v-select", vSelect);

app.use(createPinia());
app.use(router);

app.mount("#app");
