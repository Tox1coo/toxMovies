<template>
  <div v-if="isLoading" class="movie">
    <BackDropBlock :infoItem="popularListFilms"></BackDropBlock>
    <div class="movie__inner">
      <CategoryList
        :mediaTypeList="popularListFilms"
        :typeCategory="'Popular'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="topRatedList"
        :typeCategory="'Top Rated'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="[]"
        :typeCategory="'UpComing'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="[]"
        :typeCategory="'Now Plaing'"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>
<!-- TODO: доделать слайдеры с категориями! -->
<script>
/* eslint-disable-next-line no-unused-vars */
import BackDropBlock from "@/components/BackDropBlock.vue";
import { mapState, mapActions } from "vuex";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";

export default {
  name: "Movies",
  components: {
    BackDropBlock,
    CategoryList,
  },
  methods: {
    ...mapActions({
      getTopRatedList: "movies/getTopRatedList",
      getUpComingList: "movies/getUpComingList",
      getNowPlayingList: "movies/getNowPlayingList",
    }),
  },

  async mounted() {
    try {
      const config = {
        media: "movie",
        page: 1,
        region: this.region,
      };
      await this.getTopRatedList(config);
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
      popularListFilms: (state) => state.movies.popularListFilms,
      topRatedList: (state) => state.movies.topRatedList,
      upComingListFilms: (state) => state.movies.upComingListFilms,
      nowPlayingListFilms: (state) => state.movies.nowPlayingListFilms,
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