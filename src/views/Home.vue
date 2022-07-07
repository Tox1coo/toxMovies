<template>
  <div class="home">
    <div class="home__inner">
      <BackDropBlockVue
        :infoItem="
          this.popularListFilms?.results?.concat(
            this.popularListSerials?.results
          )
        "
      ></BackDropBlockVue>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BackDropBlockVue from "@/components/BackDropBlock.vue";
export default {
  name: "Home",
  components: { BackDropBlockVue },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      getGenresList: "movies/getGenresMovies",
      getPopularList: "movies/getPopularList",
      getGeolocation: "geo/getGeolocation",
    }),
  },

  async mounted() {
    await this.getGeolocation();
    this.getGenresList();
    const config = {
      region: this.region,
    };
    await this.getPopularList(config);
  },
  computed: {
    ...mapState({
      region: (state) => state.geo.region,
      popularListFilms: (state) => state.movies.popularListFilms,
      popularListSerials: (state) => state.movies.popularListSerials,
    }),
  },
};
</script>


<style lang="scss" scoped>
.home {
  width: calc(100% - 120px);
}
</style>
