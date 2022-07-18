<template>
  <div v-if="isLoading" class="tv">
    <BackDropBlock :infoItem="popularList.results"></BackDropBlock>
    <div class="tv__inner">
      <CategoryList
        :mediaTypeList="popularList.results"
        :typeCategory="'popular'"
        :title="getTitlePopular"
        :media="'tv'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="topRatedList.results"
        :typeCategory="'top_rated'"
        :title="getTitleTopRated"
        :media="'tv'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="onTheAirList.results"
        :typeCategory="'on_the_air'"
        :title="getTitleOnTheAirList"
        :media="'tv'"
      ></CategoryList>
      <CategoryList
        :mediaTypeList="airingTodayList.results"
        :typeCategory="'airing_today'"
        :title="getTitleAiringTodayList"
        :media="'tv'"
      ></CategoryList>
    </div>
  </div>
  <Loading class="loading__home" v-else></Loading>
</template>
<script>
/* eslint-disable-next-line no-unused-vars */
import BackDropBlock from "@/components/BackDropBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
import { getTVShows, getLists } from "@/api";

export default {
  name: "TVShows",
  components: {
    BackDropBlock,
    CategoryList,
  },
  data() {
    return {
      isLoading: false,
      popularList: [],
      topRatedList: [],
      onTheAirList: [],
      airingTodayList: [],
    };
  },

  async mounted() {
    try {
      this.popularList = await getTVShows("popular");
      this.topRatedList = await getTVShows("top_rated");
      this.onTheAirList = await getTVShows("on_the_air");
      this.airingTodayList = await getTVShows("airing_today");
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = true;
    }
  },
  computed: {
    getTitlePopular() {
      return getLists("tv", "popular").title;
    },
    getTitleTopRated() {
      return getLists("tv", "top_rated").title;
    },
    getTitleOnTheAirList() {
      return getLists("tv", "on_the_air").title;
    },
    getTitleAiringTodayList() {
      return getLists("tv", "airing_today").title;
    },
  },
};
</script>

<style lang="scss" scoped>
.tv {
  &__inner {
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    gap: 50px;
  }
}
</style>