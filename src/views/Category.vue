<template>
  <div class="category">
    <h2>{{ type }} {{ media }}</h2>
    <div class="category__inner">
      <CategoryItem
        v-for="categoryItem in categoryList"
        :key="categoryItem.id"
        :categoryItem="categoryItem"
      ></CategoryItem>
    </div>
    <div v-intersection="loadMore" class="observer"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import intersection from "@/components/directives/VIntersection";
import CategoryItem from "../components/homePage/Category/CategoryItem.vue";
export default {
  name: "Category",
  data() {
    return {
      media: this.$route.params.media,
      type: this.$route.params.type,
      categoryList: [],
      page: 0,
      isLoading: false,
      isLoadingMore: false,
    };
  },
  directives: {
    intersection,
  },
  async mounted() {
    const config = {};
    config.time = "week";
    config.page = this.page;
    this.getCategoryList();
  },
  computed: {
    ...mapState({
      trendingMovieList: (state) => state.movies.trendingMovieList,
      trendingTVList: (state) => state.movies.trendingTVList,
    }),
  },
  methods: {
    async getCategoryList(config) {
      if (this.type === "trending") {
        if (this.media === "tv") {
          config.type = "tv";
          await this.getTrendingList(config);
          this.categoryList = this.trendingTVList;
        } else {
          config.type = "movie";
          await this.getTrendingList(config);
          this.categoryList = this.trendingMovieList;
        }
      }
    },
    loadMore() {
      try {
        this.page++;
        const config = {
          page: this.page,
          time: "week",
        };
        this.getCategoryList(config);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoadingMore = true;
      }
    },
    ...mapActions({
      getTrendingList: "movies/getTrendingList",
    }),
  },

  components: { CategoryItem },
};
</script>

<style lang="scss" scoped>
.observer {
  height: 10px;
}

.category {
  &__inner {
    padding-top: 50px;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
  }
}
</style>