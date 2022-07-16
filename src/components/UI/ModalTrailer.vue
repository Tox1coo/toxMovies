<template>
  <div v-if="show" @click.stop="isShowTrailer(false)" class="modal">
    <Transition name="slidedown">
      <div @click.stop class="modal__inner">
        <iframe
          v-if="!trailerURL?.error"
          width="100%"
          height="100%"
          :src="trailerURL.url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h2 v-else-if="trailerURL?.error">Трейлера нет</h2>
      </div>
    </Transition>
  </div>
</template>

<script>
/*  eslint-disable no-unused-vars  */
import toggleMixin from "@/mixins/toggleMixins";
import { mapMutations } from "vuex";
export default {
  name: "ModalTrailer",
  methods: {
    ...mapMutations({
      isShowTrailer: "movies/isShowTrailer",
    }),
  },
  mixins: [toggleMixin],

  props: {
    trailerURL: {
      type: Object,
    },
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
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 128px;
      height: 128px;
      z-index: 1;
      transform: translate(-50%, -50%);
      background-image: url("../../assets/empty-folder.png");
      background-repeat: no-repeat;
    }

    width: 1500px;
    height: 900px;
    cursor: default;
    display: flex;
    h2 {
      position: absolute;
      top: 60%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, 60%);
    }
  }
}
iframe {
  border-radius: 20px;
  position: relative;
  z-index: 1000;
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