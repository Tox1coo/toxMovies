<template>
  <div v-if="isLoading" class="tv">
    <BackDropBlock :infoItem="popularList.tv"></BackDropBlock>
    <div class="tv__inner">
      <CategoryList
        :mediaTypeList="popularList.tv"
        :typeCategory="'Popular'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="topRatedList.tv"
        :typeCategory="'Top Rated'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="upComingList.tv"
        :typeCategory="'UpComing'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="nowPlayingList.tv"
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
import { mapState, mapActions } from "vuex";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";

export default {
  name: "TVShows",
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
  },

  async mounted() {
    try {
      const config = {
        media: "tv",
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
      region: (state) => state.tvs.region,
    }),
  },
};
</script>

<style lang="scss" scoped>
.tv {
  &__inner {
    margin-top: 70px;
  }
}
</style>