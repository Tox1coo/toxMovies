<template>
  <div class="search">
    <div class="search__inner">
      <CategoryItem
        v-for="searchItem in searchList.results"
        :key="searchItem.id"
        :media="searchItem.media_type"
        :categoryItem="searchItem"
      ></CategoryItem>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getSearch } from "@/api";
import CategoryItem from "@/components/homePage/Category/CategoryItem.vue";
export default {
  name: "Search",
  data() {
    return {
      searchList: [],
      totalPages: 0,
      page: 1,
    };
  },
  computed: {
    ...mapState({
      search: (state) => state.search.search,
    }),
  },

  watch: {
    async search(newSearch) {
      this.searchList = await getSearch(newSearch);
      this.totalPages = this.searchList.total_pages;
    },
  },
  components: { CategoryItem },
};
</script>

<style lang="scss" scoped>
.search {
  padding: 30px 30px 30px 50px;
  &__inner {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
}
</style>