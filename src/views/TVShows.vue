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
        :mediaTypeList="onTheAirList.tv"
        :typeCategory="'On the Air'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="airingTodayList.tv"
        :typeCategory="'Airing Today'"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>
<!-- TODO: переделать передачу парамаетров для слайдера с типами и тд -->
<script>
/* eslint-disable-next-line no-unused-vars */
import BackDropBlock from "@/components/BackDropBlock.vue";
import { mapMutations, mapState, mapActions } from "vuex";
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
      getPopularList: "category/getPopularList",
      getAiringTodayList: "category/getAiringTodayList",
      getOnTheAirList: "category/getOnTheAirList",
    }),
    ...mapMutations({
      clearList: "category/clearList",
    }),
  },

  async mounted() {
    this.clearList({ list: "popularList", media: "tv" });
    this.clearList({ list: "topRatedList", media: "tv" });
    this.clearList({ list: "airingTodayList", media: "tv" });
    this.clearList({ list: "onTheAirList", media: "tv" });
    try {
      const config = {
        media: "tv",
        page: 1,
        region: this.region,
      };
      await this.getPopularList(config);
      await this.getTopRatedList(config);
      await this.getAiringTodayList(config);
      await this.getOnTheAirList(config);
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
      onTheAirList: (state) => state.category.onTheAirList,
      airingTodayList: (state) => state.category.airingTodayList,
      region: (state) => state.movies.region,
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