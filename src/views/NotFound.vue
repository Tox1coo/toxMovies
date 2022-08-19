<template>
  <div class="notfound">
    <h1 class="title">{{ error }}</h1>
    <p class="text text--error">
      Looks like you've followed a broken link or entered a URL that doesn't
      exist on this site.
    </p>
    <p class="text text--error">
      Back to our <a @click="$router.push('/')"> Home page </a>
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "NotFound",
  computed: {
    ...mapState({
      error: (state) => state.movies.error,
    }),
  },
  mounted() {
    this.setIsLoading(true);
  },
  beforeUnmount() {
    this.setIsLoading(false);
  },
  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
    }),
  },
};
</script>

<style lang="scss" scoped>
.notfound {
  padding: 10px;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 15px;
  .text {
    max-width: 450px;
    a {
      cursor: pointer;
      text-decoration: underline;
      color: $main-color;
    }
  }
}
</style>