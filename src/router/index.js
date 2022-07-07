import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Movies from "@/views/Movies.vue";
import TVShows from "@/views/TVShows.vue";
import PageItem from "@/views/PageItem.vue";
import Search from "@/views/Search.vue";



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie",
    component: Movies,
  },
  {
    path: "/tvshows",
    component: TVShows,
  },
  {
    path: "/movie/:id",
    component: PageItem,
  },
  {
    path: "/tvshows/:id",
    component: PageItem,
  },
  {
    path: "/search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
