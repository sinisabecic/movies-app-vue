import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/style.css";
import axiosPlugin from "./services/axiosPlugin";
import { createPinia } from "pinia";

let app;
app = createApp(App);
app.use(router);
app.use(axiosPlugin);
app.use(createPinia());

app.mount("#app");
