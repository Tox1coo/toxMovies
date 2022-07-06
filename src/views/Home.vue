<template>
  <div class="home"></div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {},

  methods: {
    ...mapActions({
      getGenresList: "movies/getGenresMovies",
      getPopularList: "movies/getPopularList",
      getGeolocation: "geo/getGeolocation",
    }),
  },

  async mounted() {
    await this.getGeolocation();
    this.getGenresList();
    await this.getPopularList(this.region);
  },
  computed: {
    ...mapState({
      region: (state) => state.geo.region,
    }),
  },
};
</script>
