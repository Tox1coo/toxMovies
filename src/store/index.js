import { createStore } from "vuex";
import { movies } from "@/store/modules/movies";
import { geo } from "@/store/modules/geo"
import { category } from "@/store/modules/category"

export default createStore({
  modules: {
    movies: movies,
    geo: geo,
    category: category
  },
});
