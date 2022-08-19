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
</template>

<script>
import { getMovies, getTVShows, getTrending, getLists } from "@/api";

import BackDropBlockVue from "@/components/BackDropBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  components: { BackDropBlockVue, CategoryList },
  data() {
    return {
      backdropList: [],
      trendingMovies: [],
      trendingTV: [],
    };
  },

  async created() {
    try {
      const movie = await getMovies("popular");
      const tv = await getTVShows("popular");
      this.backdropList = [...movie.results, ...tv.results];
      this.trendingMovies = await getTrending("movie");
      this.trendingTV = await getTrending("tv");
    } catch (error) {
      this.$router.push("/notfound");
      this.updateError("Page not found");
    } finally {
      this.setIsLoading(true);
    }
  },
  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
      updateError: "movies/updateError",
    }),
  },
  beforeUnmount() {
    this.setIsLoading(false);
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
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
