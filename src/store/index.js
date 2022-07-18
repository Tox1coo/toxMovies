import { createStore } from "vuex";
import { movies } from "@/store/modules/movies";
import { geo } from "@/store/modules/geo"
import { search } from "@/store/modules/search"


export default createStore({
  modules: {
    movies: movies,
    geo: geo,
    search: search,
  },
});
