<template functionality>
  <div v-if="isLoading" class="genre">
    <Back class="back--genre"></Back>

    <h2 class="title title--page">
      {{ getTitle }}
    </h2>
    <div class="genre__inner">
      <transition-group name="listAnim">
        <CategoryItem
          v-for="categoryItem in lists.results"
          :key="categoryItem.id"
          :categoryItem="categoryItem"
          :media="$route.params.media"
        ></CategoryItem>
      </transition-group>
    </div>
    <div
      v-if="lists?.results?.length > 0"
      v-intersection="loadMore"
      class="observer"
    ></div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars  */
import intersection from "@/components/directives/VIntersection";
import { mapMutations, mapState } from "vuex";
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
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
    }),
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
        throw new Error("Ошибка");
      }
    } catch (error) {
      this.$router.push("/notfound");
      this.updateError("Page not found");
    } finally {
      this.setIsLoading(true);
    }
  },
  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
      updateError: "movies/updateError",
    }),
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
  beforeUnmount() {
    this.setIsLoading(false);
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
    @media (max-width: 1120px) {
      justify-content: center;
    }
  }
  @media (max-width: 750px) {
    padding-left: 10px;
  }
  .title {
    @media (max-width: 460px) {
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