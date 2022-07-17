<template>
  <div
    @click="
      $emit('showModal', {
        modal: true,
        key: sliderItem.key,
        indexItem: indexItem,
      })
    "
    class="video__block"
  >
    <img
      :src="`https://img.youtube.com/vi/${sliderItem.key}/mqdefault.jpg`"
      :alt="sliderItem.title"
    />
    <h2 class="title title--slider">{{ sliderItem.name }}</h2>
    <h3 class="subtitle subtitle--slider">{{ sliderItem.type }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    sliderItem: {
      type: Object,
      default: () => {},
    },
    showModal: Boolean,
    indexItem: Number,
  },
};
</script>

<style lang="scss" scoped>
.video__block {
  cursor: pointer;
  position: relative;
  max-width: 320px;
  max-height: 325px;
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  img {
    position: relative;
    z-index: 1;
    transition: transform 0.4s ease 0s;
    min-width: 320px;
    max-height: 180px;
    @media (max-width: 380px) {
      max-height: 150px;
      min-width: 250px;
    }
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    height: 64px;
    width: 64px;
    transform: translate(-50%, -100%);

    background-image: url("../../../assets/video.png");
    @media (max-width: 380px) {
      height: 32px;
      width: 32px;
      background-image: url("../../../assets/video-small.png");
      background-repeat: no-repeat;
    }
  }
}
</style>