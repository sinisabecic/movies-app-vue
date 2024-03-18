import { apiCallMovie } from "../services/api";
import { App } from "vue";

export default {
  install: (app: App) => {
    app.config.globalProperties.$http = apiCallMovie;
  },
};
