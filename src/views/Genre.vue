<template>
  <div class="genre">
    <h2 class="title title--page">
      {{ getTitle }}
    </h2>
    <div class="genre__inner">
      <CategoryItem
        v-for="categoryItem in lists.results"
        :key="categoryItem.id"
        :categoryItem="categoryItem"
        :media="$route.params.media"
      ></CategoryItem>
    </div>
    <div
      v-if="lists?.results?.length > 0"
      v-intersection="loadMore"
      class="observer"
    ></div>
    <Loading v-if="page < totalPage"></Loading>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars  */
import intersection from "@/components/directives/VIntersection";

import { getGenreList, getMediaByGenre } from "@/api";
import CategoryItem from "@/components/homePage/Category/CategoryItem.vue";
export default {
  name: "Genre",
  data() {
    return {
      title: "",
      page: 1,
      totalPage: 0,
      genre: {},
      lists: {},
    };
  },
  directives: {
    intersection,
  },
  computed: {
    getTitle() {
      return `${this.genre[0]?.title}: ${this.genre[0]?.name}`;
    },
  },
  async created() {
    try {
      this.lists = await getMediaByGenre(
        this.$route.params.media,
        this.$route.params.id
      );
      this.totalPage = this.lists.total_pages;
      this.genre = await getGenreList(this.$route.params.media);

      this.genre = this.genre.genres.filter(
        (genre) => genre.id === parseInt(this.$route.params.id)
      );
      this.genre[0].title =
        this.$route.params.media === "tv" ? "TVShows Genre" : "Movies Genre";
      if (this.genre) {
        return;
      } else {
        console.log("page non found"); // переделать на страницу с не найденными жанрами
        throw new Error("Ошибка");
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    loadMore() {
      getMediaByGenre(
        this.$route.params.media,
        this.$route.params.id,
        ++this.page
      )
        .then((response) => {
          this.lists.results = [...this.lists.results, ...response.results];
          this.page = response.page;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: { CategoryItem },
};
</script>

<style lang="scss" scoped>
.genre {
  padding-left: 50px;
  padding-top: 50px;
  &__inner {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    padding-top: 20px;
  }
}
</style>