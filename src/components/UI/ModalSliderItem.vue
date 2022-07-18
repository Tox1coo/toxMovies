<template>
  <Loading v-if="trailerKey == undefined"></Loading>

  <iframe
    v-else-if="
      (trailerKey != '' || trailerKey != null || trailerKey != undefined) &&
      typeModal === 'video'
    "
    width="100%"
    height="100%"
    :src="`https://www.youtube.com/embed/${trailerKey}?autoplay=1`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
  <img
    v-else-if="
      (trailerKey != '' || trailerKey != null || trailerKey != undefined) &&
      typeModal === 'photo'
    "
    :src="`${IMAGE_URL}/original${trailerKey}`"
    class="image__slider"
    alt=""
  />
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ModalSliderItem",
  props: {
    trailerKey: {
      type: String,
      default: "",
    },
    typeModal: String,
  },

  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
};
</script>

<style lang="scss" scoped>
iframe {
  max-width: 100%;
}

.image__slider {
  height: 100%;
  @media (max-width: 1200px) {
    height: 50vh;
    max-width: 80vw;
  }
  max-width: 100%;
  background-color: rgba(#999, 0.3);
}
</style>