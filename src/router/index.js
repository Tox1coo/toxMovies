import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Movies from "@/views/Movies.vue";
import TVShows from "@/views/TVShows.vue";
import PagePerson from "@/views/PagePerson.vue";
import PageItem from "@/views/PageItem.vue";
import Search from "@/views/Search.vue";
import Category from "@/views/Category.vue";
import Genre from "@/views/Genre.vue";

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
    path: "/:media/:id",
    component: PageItem,
  },
  {
    path: "/:media/:id",
    component: PageItem,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/person/:id",
    component: PagePerson,
  },
  {
    path: "/:media/category/:type",
    component: Category,
  },
  {
    path: "/genre/:id/:media",
    component: Genre,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
