import { createStore } from "vuex";
import { movies } from "@/store/modules/movies";
import { geo } from "@/store/modules/geo"
import { category } from "@/store/modules/category"
import { person } from "@/store/modules/person"
import { search } from "@/store/modules/search"


export default createStore({
  modules: {
    movies: movies,
    geo: geo,
    category: category,
    person: person,
    search: search,
  },
});
