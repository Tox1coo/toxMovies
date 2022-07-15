<template>
  <NavBar></NavBar>
  <Footer></Footer>
  <ModalTrailer :show="showTrailer"></ModalTrailer>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      showTrailer: (state) => state.movies.showTrailer,
    }),
  },
  methods: {
    ...mapActions({
      getGenresList: "movies/getGenresMovies",
      getPopularList: "category/getPopularList",
      getGeolocation: "geo/getGeolocation",
      getTrendingList: "category/getTrendingList",
    }),
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
    }),
  },

  async created() {
    try {
      await this.getGeolocation();
      await this.getGenresList();
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsLoading(true);
    }
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, "Roboto";
  color: $main-color;
  background-color: $main-bgcolor;
  min-height: 100%;
  overflow: hidden;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
