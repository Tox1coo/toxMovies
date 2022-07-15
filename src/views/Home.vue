<template>
  <div v-if="isLoading" class="home">
    <div class="home__header">
      <BackDropBlockVue
        :infoItem="popularList.movie.concat(popularList.tv)"
      ></BackDropBlockVue>
    </div>
    <div class="home__body">
      <CategoryList
        :typeCategory="'Trending'"
        :mediaTypeList="trendingList['movie']"
      ></CategoryList>

      <CategoryList
        :typeCategory="'Trending'"
        :mediaTypeList="trendingList['tv']"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import BackDropBlockVue from "@/components/BackDropBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
export default {
  name: "Home",
  components: { BackDropBlockVue, CategoryList },
  data() {
    return {
      isLoading: false,
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
    try {
      const config = {
        region: this.region,
        media: "movie",
      };
      console.log(new Date());

      await this.getPopularList(config);

      console.log(new Date());
      config.media = "tv";

      await this.getPopularList(config);
      const configTrending = {
        time: "week",
        media: "tv",
        page: 1,
      };

      this.clearList({ list: "trendingList", media: "movie" });
      this.clearList({ list: "trendingList", media: "tv" });
      await this.getTrendingList(configTrending);
      configTrending.media = "movie";
      await this.getTrendingList(configTrending);
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
