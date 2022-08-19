<template>
  <div v-if="isLoading" class="movie">
    <BackDropBlock :infoItem="popularList.results"></BackDropBlock>
    <div class="movie__inner">
      <CategoryList
        :mediaTypeList="popularList.results"
        :typeCategory="'popular'"
        :media="'movie'"
        :title="getTitlePopular"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="topRatedList.results"
        :typeCategory="'top_rated'"
        :media="'movie'"
        :title="getTitleTopRated"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="upComingList.results"
        :typeCategory="'upcoming'"
        :media="'movie'"
        :title="getTitleUpComing"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="nowPlayingList.results"
        :typeCategory="'now_playing'"
        :media="'movie'"
        :title="getTitleNow"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>
<script>
/* eslint-disable-next-line no-unused-vars */
import BackDropBlock from "@/components/BackDropBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
import { getMovies, getLists } from "@/api";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Movies",
  components: {
    BackDropBlock,
    CategoryList,
  },
  data() {
    return {
      popularList: [],
      topRatedList: [],
      upComingList: [],
      nowPlayingList: [],
    };
  },

  async mounted() {
    try {
      this.popularList = await getMovies("popular");
      this.topRatedList = await getMovies("top_rated");
      this.upComingList = await getMovies("upcoming");
      this.nowPlayingList = await getMovies("now_playing");
    } catch (error) {
      console.log(error);
    } finally {
      this.setIsLoading(true);
    }
  },
  beforeUnmount() {
    this.setIsLoading(false);
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
    }),
    getTitlePopular() {
      return getLists("movie", "popular").title;
    },
    getTitleTopRated() {
      return getLists("movie", "top_rated").title;
    },
    getTitleUpComing() {
      return getLists("movie", "upcoming").title;
    },
    getTitleNow() {
      return getLists("movie", "now_playing").title;
    },
  },
  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
    }),
  },
};
</script>

<style lang="scss" scoped>
.movie {
  &__inner {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
</style>