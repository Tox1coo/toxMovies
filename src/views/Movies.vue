<template>
  <div v-if="isLoading" class="movie">
    <BackDropBlock :infoItem="popularList.movie"></BackDropBlock>
    <div class="movie__inner">
      <CategoryList
        :mediaTypeList="popularList.movie"
        :typeCategory="'Popular'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="topRatedList.movie"
        :typeCategory="'Top Rated'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="upComingList.movie"
        :typeCategory="'UpComing'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="nowPlayingList.movie"
        :typeCategory="'Now Playing'"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>
<!-- TODO: переделать передачу парамаетров для слайдера с типами и тд -->
<script>
/* eslint-disable-next-line no-unused-vars */
import BackDropBlock from "@/components/BackDropBlock.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";

export default {
  name: "Movies",
  components: {
    BackDropBlock,
    CategoryList,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    ...mapActions({
      getTopRatedList: "category/getTopRatedList",
      getUpComingList: "category/getUpComingList",
      getNowPlayingList: "category/getNowPlayingList",
      getPopularList: "category/getPopularList",
    }),
    ...mapMutations({
      clearList: "category/clearList",
    }),
  },

  async mounted() {
    this.clearList({ list: "popularList", media: "movie" });
    this.clearList({ list: "topRatedList", media: "movie" });
    this.clearList({ list: "upComingList", media: "movie" });
    this.clearList({ list: "nowPlayingList", media: "movie" });
    try {
      const config = {
        media: "movie",
        page: 1,
        region: this.region,
      };
      await this.getPopularList(config);
      await this.getTopRatedList(config);
      await this.getNowPlayingList(config);
      await this.getUpComingList(config);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = true;
    }
  },
  computed: {
    ...mapState({
      popularList: (state) => state.category.popularList,
      topRatedList: (state) => state.category.topRatedList,
      upComingList: (state) => state.category.upComingList,
      nowPlayingList: (state) => state.category.nowPlayingList,
      region: (state) => state.movies.region,
    }),
  },
};
</script>

<style lang="scss" scoped>
.movie {
  &__inner {
    margin-top: 70px;
  }
}
</style>