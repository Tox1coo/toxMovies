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
    <div v-if="isLoading" v-intersection="loadMore" class="observer"></div>
    <Loading v-if="page < totalPage"></Loading>
  </div>
</template>
<!-- TODO: сделать проверку на максимульное количество страниц -->
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
      trendingList: (state) => state.category.trendingList,
      topRatedList: (state) => state.category.topRatedList,
      popularList: (state) => state.category.popularList,
      nowPlayingList: (state) => state.category.nowPlayingList,
      upComingList: (state) => state.category.upComingList,
      region: (state) => state.geo.region,
      totalPage: (state) => state.category.totalPage,
    }),
  },
  /* Продумать как лучше сделать загрузку данных */
  mounted() {
    const config = {
      page: this.page,
      time: "week",
    };
    this.getCategoryList(config);
    setTimeout(() => {
      this.isLoading = true;
    }, 500);
    /* TODO: сделать проверку есть ли запись в массиве или нет, чтобы не загружались одни и те же позиции!! */
  },
  methods: {
    async getCategoryList(config) {
      config.media = this.media;
      config.region = this.region;
      switch (this.type) {
        case "trending":
          await this.getTrendingList(config);
          this.categoryList = this.trendingList[this.media];
          break;
        case "top_rated":
          await this.getTopRatedList(config);
          this.categoryList = this.topRatedList[this.media];
          break;
        case "popular":
          await this.getPopularList(config);
          this.categoryList = this.popularList[this.media];
          break;
        case "now_playing":
          await this.getNowPlayingList(config);
          this.categoryList = this.nowPlayingList[this.media];
          break;
        case "upcoming":
          await this.getUpComingList(config);
          this.categoryList = this.upComingList[this.media];
          break;
        default:
          break;
      }
      // переписать в виде функции
    },
    loadMore() {
      try {
        if (this.page < this.totalPage) {
          this.page++;
          const config = {
            page: this.page,
            time: "week",
          };
          this.getCategoryList(config);
        } else {
          this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions({
      getTrendingList: "category/getTrendingList",
      getTopRatedList: "category/getTopRatedList",
      getPopularList: "category/getPopularList",
      getUpComingList: "category/getUpComingList",
      getNowPlayingList: "category/getNowPlayingList",
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