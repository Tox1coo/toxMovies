<template>
  <NavBar></NavBar>
  <Footer></Footer>
  <SearchInput @search="searchMulti"></SearchInput>
</template>
<!-- TODO: Сделать слайдер с коллекциями. Или отдельную вкладку с коллекцией -->
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      showSearch: (state) => state.search.showSearch,
      showTrailer: (state) => state.movies.showTrailer,
    }),
  },
  methods: {
    ...mapMutations({
      updateSearch: "search/updateSearch",
      setIsLoading: "movies/setIsLoading",
    }),
    searchMulti(item) {
      console.log(this.$route.path);
      if (!this.$route.path.includes("search") && item.length > 0) {
        this.$router.push("/search");
        this.updateSearch(item);
      } else if (this.$route.path.includes("search") && item.length > 0) {
        this.updateSearch(item);
      } else {
        this.$router.go(-1);
      }
    },
  },

  async created() {
    this.setIsLoading(true);
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, "Roboto";
  color: $main-color;
  background-color: $main-bgcolor;
  min-height: 100%;
  overflow: hidden;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1200px) {
    width: 100%;
  }
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
