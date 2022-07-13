<template>
  <div v-if="isLoading" class="home">
    <div class="home__header">
      <BackDropBlockVue
        :infoItem="popularListFilms?.concat(popularListSerials)"
      ></BackDropBlockVue>
    </div>
    <div class="home__body">
      <CategoryList
        :typeCategory="'Trending'"
        :mediaTypeList="trendingTVList"
      ></CategoryList>

      <CategoryList
        :typeCategory="'Trending'"
        :mediaTypeList="trendingMovieList"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>

<script>
import { mapState } from "vuex";
import BackDropBlockVue from "@/components/BackDropBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
export default {
  name: "Home",
  components: { BackDropBlockVue, CategoryList },
  data() {
    return {};
  },
  /*   methods: {
    ...mapActions({
      getGenresList: "movies/getGenresMovies",
      getPopularList: "movies/getPopularList",
      getGeolocation: "geo/getGeolocation",
      getTrendingList: "movies/getTrendingList",
    }),
  }, */

  /*   async created() {
    try {
      await this.getGeolocation();
      this.getGenresList();
      const config = {
        region: this.region,
      };
      await this.getPopularList(config);
      const configTrending = {
        time: "week",
        type: "tv",
        page: 1,
      };
      await this.getTrendingList(configTrending);
      configTrending.type = "movie";
      await this.getTrendingList(configTrending);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = true;
    }
  }, */
  computed: {
    ...mapState({
      region: (state) => state.geo.region,
      popularListFilms: (state) => state.movies.popularListFilms,
      popularListSerials: (state) => state.movies.popularListSerials,
      trendingMovieList: (state) => state.movies.trendingMovieList,
      trendingTVList: (state) => state.movies.trendingTVList,
      isLoading: (state) => state.movies.isLoading,
    }),
  },
};
</script>


<style lang="scss" scoped>
.home {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  &__body {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
</style>
