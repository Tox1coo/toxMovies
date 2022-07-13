<template>
  <div class="category">
    <h2>{{ getTitle() }}</h2>
    <div class="category__inner">
      <CategoryItem
        v-for="categoryItem in categoryList"
        :key="categoryItem.id"
        :categoryItem="categoryItem"
      ></CategoryItem>
    </div>
    <div v-intersection="loadMore" class="observer"></div>
    <Loading></Loading>
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
      page: 1,
      isLoading: false,
      isLoadingMore: false,
    };
  },
  directives: {
    intersection,
  },

  computed: {
    ...mapState({
      trendingMovieList: (state) => state.movies.trendingMovieList,
      trendingTVList: (state) => state.movies.trendingTVList,
      topRatedList: (state) => state.movies.topRatedList,
      popularListSerials: (state) => state.movies.popularListSerials,
      popularListFilms: (state) => state.movies.popularListFilms,
    }),
  },
  methods: {
    async getCategoryList(config) {
      if (this.type === "trending") {
        config.type = this.media;
        await this.getTrendingList(config);
        if (this.media === "tv") {
          this.categoryList = this.trendingTVList;
        } else {
          this.categoryList = this.trendingMovieList;
        }
      } else if (this.type === "top_rated") {
        config.media = this.media;

        await this.getTopRatedList(config);
        this.categoryList = this.topRatedList;
      } else if (this.type === "popular") {
        await this.getPopularList(config);
        if (this.media === "tv") {
          this.categoryList = this.popularListSerials;
        } else {
          this.categoryList = this.popularListFilms;
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
      }
    },
    ...mapActions({
      getTrendingList: "movies/getTrendingList",
      getTopRatedList: "movies/getTopRatedList",
      getPopularList: "movies/getPopularList",
    }),
    getTitle() {
      if (this.type !== "top_rated") {
        return `${this.type} ${this.media}`;
      } else if (this.type == "top_rated") {
        return `Top Rated ${this.media}`;
      }
    },
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