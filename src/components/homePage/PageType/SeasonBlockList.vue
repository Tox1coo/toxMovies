<template>
  <div
    @click="
      $emit('showEpisodes', {
        visibleEpisodeList: true,
        season: seasonInfo.season_number,
      })
    "
    class="season__block"
  >
    <img :src="`${IMAGE_URL}/w185${seasonInfo.poster_path}`" alt="" />
    <h3 class="title title--season">Сезон № {{ seasonInfo.season_number }}</h3>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
  props: {
    seasonInfo: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  emits: ["showEpisodes"],
};
</script>

<style lang="scss" scoped>
.season__block {
  img {
    transition: all 0.2s ease 0s;
  }
  cursor: pointer;
  &:hover {
    img {
      transform: scale(1.05);
      border-radius: 15px;
    }
  }
}
</style>