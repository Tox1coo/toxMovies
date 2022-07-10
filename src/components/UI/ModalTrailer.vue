<template>
  <div v-if="show" @click.stop="isShowTrailer(false)" class="modal">
    <Transition name="slidedown">
      <div @click.stop class="modal__inner">
        <iframe
          width="100%"
          height="100%"
          :src="`https://www.youtube.com/embed/${trailerKey}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </Transition>
  </div>
</template>

<script>
/*  eslint-disable no-unused-vars  */
import toggleMixin from "@/mixins/toggleMixins";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "ModalTrailer",
  methods: {
    ...mapMutations({
      isShowTrailer: "movies/isShowTrailer",
    }),
  },
  mixins: [toggleMixin],
  computed: {
    ...mapState({
      trailerKey: (state) => state.movies.trailerKey,
    }),
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1000;
  display: flex;
  cursor: pointer;
  &__inner {
    position: relative;
    padding: 20px;
    margin: auto;
    background: $main-bgcolor;
    border-radius: 24px;

    width: 1500px;
    height: 700px;
    cursor: default;
    display: flex;
  }
}
iframe {
  border-radius: 20px;
}

.slidedown-enter-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slidedown-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slidedown-enter-to {
  top: 50px;
}
.slidedown-leave-to {
  opacity: 0;
}
</style>