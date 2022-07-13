<template>
  <NavBar></NavBar>
  <Footer></Footer>
  <ModalTrailer :show="showTrailer"></ModalTrailer>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      showTrailer: (state) => state.movies.showTrailer,
    }),
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
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
