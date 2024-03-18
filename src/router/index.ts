import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Movie from "../views/Movie.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: Movie,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

export default router;
