<template>
  <div v-if="isLoading" class="home">
    <div class="home__header">
      <BackDropBlockVue :infoItem="backdropList"></BackDropBlockVue>
    </div>
    <div class="home__body">
      <CategoryList
        :typeCategory="'trending'"
        :mediaTypeList="trendingMovies.results"
        :media="'movie'"
        :title="trendingMoviesTitle"
      ></CategoryList>

      <CategoryList
        :typeCategory="'trending'"
        :mediaTypeList="trendingTV.results"
        :media="'tv'"
        :title="trendingTVTitle"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>

<script>
import { getMovies, getTVShows, getTrending, getLists } from "@/api";

import { mapActions, mapMutations, mapState } from "vuex";
import BackDropBlockVue from "@/components/BackDropBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
export default {
  name: "Home",
  components: { BackDropBlockVue, CategoryList },
  data() {
    return {
      isLoading: false,
      backdropList: [],
      trendingMovies: [],
      trendingTV: [],
    };
  },
  methods: {
    ...mapActions({
      getGenresList: "movies/getGenresMovies",
      getPopularList: "category/getPopularList",
      getGeolocation: "geo/getGeolocation",
      getTrendingList: "category/getTrendingList",
    }),
    ...mapMutations({
      clearList: "category/clearList",
    }),
  },

  async created() {
    /*     const list = getMovies("trending");
    console.log(list); */
    try {
      const movie = await getMovies("popular");
      const tv = await getTVShows("popular");

      this.backdropList = [...movie.results, ...tv.results];

      this.clearList({ list: "trendingList", media: "movie" });
      this.clearList({ list: "trendingList", media: "tv" });
      this.trendingMovies = await getTrending("movie");
      this.trendingTV = await getTrending("tv");
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = true;
    }
  },
  computed: {
    ...mapState({
      region: (state) => state.geo.region,
      popularList: (state) => state.category.popularList,
      trendingList: (state) => state.category.trendingList,
    }),

    trendingMoviesTitle() {
      return getLists("movie", "trending").title;
    },
    trendingTVTitle() {
      return getLists("tv", "trending").title;
    },
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
