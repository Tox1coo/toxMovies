<template functionality>
  <div class="search">
    <Back class="back--search"></Back>

    <div class="search__top">
      <h2 class="title title--page">Result for: {{ search }}</h2>
    </div>
    <div class="search__inner">
      <transition-group name="listAnim">
        <CategoryItem
          v-for="searchItem in searchList.results"
          :key="searchItem.id"
          :media="searchItem.media_type"
          :categoryItem="searchItem"
        ></CategoryItem>
      </transition-group>
    </div>
    <div
      v-if="searchList.results.length > 0 && page < totalPages"
      class="observer"
      v-intersection="loadMore"
    ></div>
    <Loading v-if="page < totalPages && isLoading"></Loading>
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
      countResult: 0,
      isLoading: false,
    };
  },
  computed: {
    ...mapState({
      search: (state) => state.search.search,
    }),
  },

  watch: {
    async search(newSearch) {
      this.isLoading = true;
      this.searchList = await getSearch(newSearch);
      this.totalPages = this.searchList.total_pages;
      this.isLoading = false;
    },
  },

  methods: {
    loadMore() {
      try {
        getSearch(this.search, ++this.page)
          .then((response) => {
            this.searchList.results = [
              ...this.searchList.results,
              ...response.results,
            ];
            this.page = response.page;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
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
  &__top {
    margin-bottom: 20px;
  }
}

.listAnim-active,
.listAnim-leave-active {
  transition: all 1s ease;
}
.listAnim-enter-from,
.listAnim-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>