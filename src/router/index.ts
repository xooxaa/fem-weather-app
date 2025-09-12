import { createMemoryHistory, createRouter } from "vue-router";
import WeatherWidget from "@/components/WeatherWidget.vue";

const routes = [{ path: "/", component: WeatherWidget }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
