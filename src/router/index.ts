import { createMemoryHistory, createRouter } from "vue-router";
import WeatherWidget from "@/views/WeatherWidget.vue";

const routes = [
  { path: "/", component: WeatherWidget },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
