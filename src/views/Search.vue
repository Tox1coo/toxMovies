<template functionality>
  <div class="search">
    <Back class="back--search"></Back>

    <div class="search__top title--page">Result for: {{ search }}</div>
    <div class="search__inner">
      <transition-group name="listAnim">
        <CategoryItem
          v-for="searchItem in searchList.results"
          :key="searchItem.id"
          :media="searchItem.media_type"
          :categoryItem="searchItem"
        ></CategoryItem>
      </transition-group>
      <div
        v-if="searchList.length === 0 || searchList.results.length === 0"
        class="search__empty"
      >
        <img :src="require('@/assets/search-not-found.png')" alt="" />
        <h2 class="title title--page">Search not found</h2>
      </div>
    </div>
    <div
      v-if="searchList.results?.length > 0 && page < totalPages"
      class="observer"
      v-intersection="loadMore"
    ></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
      isLoading: (state) => state.movies.isLoading,
    }),
  },
  mounted() {
    this.setIsLoading(true);
  },
  watch: {
    async search(newSearch) {
      this.searchList = await getSearch(newSearch);
      this.totalPages = this.searchList.total_pages;
    },
  },
  beforeUnmount() {
    this.setIsLoading(false);
  },
  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
    }),
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
    align-items: center;
    justify-content: center;
    min-height: 61vh;
  }
  &__empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__top {
    margin-bottom: 20px;
    .title {
      @media (max-width: 379px) {
        width: 76%;
      }
    }
    overflow: hidden;
  }
  @media (max-width: 900px) {
    padding-left: 10px;
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