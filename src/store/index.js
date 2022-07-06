import { createStore } from "vuex";
import { movies } from "@/store/modules/movies";
import { geo } from "@/store/modules/geo"
export default createStore({
  modules: {
    movies: movies,
    geo: geo,
  },
});
