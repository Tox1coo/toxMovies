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
    <div class="season__block-img">
      <img :src="`${IMAGE_URL}/w185${seasonInfo.poster_path}`" alt="" />
    </div>
    <h3 class="title title--season">Season № {{ seasonInfo.season_number }}</h3>
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
    z-index: 5;
    position: relative;
  }
  &-img {
    background-color: #202124;
    position: relative;
    min-width: 185px;
    max-width: 185px;

    min-height: 265px;
    &::after {
      content: "";
      position: absolute;
      display: block;
      top: 50%;
      height: 64px;
      width: 64px;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      background-image: url("../../../assets/error.png");
    }
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