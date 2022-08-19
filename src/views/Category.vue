<template functionality>
  <div class="category">
    <Back class="back--category"></Back>

    <h2>{{ getTitle }}</h2>
    <div class="category__inner">
      <transition-group name="listAnim">
        <CategoryItem
          v-for="categoryItem in categoryList.results"
          :key="categoryItem.id"
          :categoryItem="categoryItem"
          :media="media"
        ></CategoryItem>
      </transition-group>
    </div>
    <div
      v-if="categoryList?.results?.length > 0"
      v-intersection="loadMore"
      class="observer"
    ></div>
  </div>
</template>
<!-- TODO: сделать проверку на максимульное количество страниц -->
<script>
/*  eslint-disable no-unused-vars  */

import intersection from "@/components/directives/VIntersection";
import CategoryItem from "../components/homePage/Category/CategoryItem.vue";
import { getLists, getMovies, getTVShows, getTrending } from "@/api";
import { mapMutations } from "vuex";
export default {
  name: "Category",
  data() {
    return {
      media: this.$route.params.media,
      type: this.$route.params.type,
      categoryList: [],
      page: 1,
      totalPage: 0,
    };
  },
  directives: {
    intersection,
  },

  computed: {
    getTitle() {
      return getLists(this.media, this.type)?.title;
    },
  },
  async mounted() {
    try {
      if (this.type === "trending") {
        this.categoryList = await getTrending(this.media);
        this.totalPage = this.categoryList.total_pages;
      } else {
        if (this.media === "movie") {
          this.categoryList = await getMovies(this.type);
          this.totalPage = this.categoryList.total_pages;
        } else if (this.media === "tv") {
          this.categoryList = await getTVShows(this.type);
          this.totalPage = this.categoryList.total_pages;
        }
      }
    } catch (error) {
      this.$router.push("/notfound");
      this.updateError("Page not found");
    } finally {
      this.setIsLoading(true);
    }
  },
  beforeUnmount() {
    this.setIsLoading(false);
  },
  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
      updateError: "movies/updateError",
    }),
    loadMore() {
      if (this.type === "trending") {
        getTrending(this.media, ++this.page).then((response) => {
          this.categoryList.results = [
            ...this.categoryList.results,
            ...response.results,
          ];
          this.page = response.page;
        });
      } else {
        if (this.media === "movie") {
          getMovies(this.type, ++this.page).then((response) => {
            this.categoryList.results = [
              ...this.categoryList.results,
              ...response.results,
            ];
            this.page = response.page;
          });
        } else {
          getTVShows(this.type, ++this.page).then((response) => {
            this.categoryList.results = [
              ...this.categoryList.results,
              ...response.results,
            ];
            this.page = response.page;
          });
        }
      }
    },
  },

  components: { CategoryItem },
};
</script>

<style lang="scss" scoped>
.category {
  h2 {
    margin-top: 30px;
  }
  &__inner {
    padding-top: 30px;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    @media (max-width: 1120px) {
      justify-content: center;
    }
  }
  & .loading {
    transform: translate(-40%, 5px);
  }
  @media (max-width: 379px) {
    h2 {
      font-size: 21px;
      width: 70%;
    }
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