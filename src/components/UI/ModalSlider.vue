<template>
  <div v-if="show" class="video__modal" @click.stop="hideDialog">
    <div @click.stop class="video__modal-list">
      <swiper
        :slidesPerView="1"
        :slidesPerGroup="1"
        :navigation="true"
        @transitionEnd="onSwipe"
      >
        <swiper-slide v-for="modalItem in modalList" :key="modalItem.id">
          <ModalSliderItem :trailerKey="modalItem.key"></ModalSliderItem>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

// swiper bundle styles
import "swiper/swiper-bundle.min.css";

// swiper core styles
import "swiper/swiper.min.css";

// modules styles
import "swiper/components/navigation/navigation.min.css";

// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation]);
import toggleMixins from "@/mixins/toggleMixins";
export default {
  name: "ModalSlider",
  props: {
    show: Boolean,
    typeModal: {
      type: String,
      required: true,
    },
    modalList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  components: { Swiper, SwiperSlide },

  mixins: [toggleMixins],
  methods: {
    onSwipe(swipe) {
      const progress = swipe.progress;

      if (progress === 0) {
        swipe.navigation.$prevEl[0].style.opacity = "0";
        swipe.navigation.$prevEl[0].style.visibility = "hidden";
      } else {
        swipe.navigation.$prevEl[0].style.opacity = "1";
        swipe.navigation.$prevEl[0].style.visibility = "visible";
      }
      if (progress === 1) {
        swipe.navigation.$nextEl[0].style.opacity = "0";
        swipe.navigation.$nextEl[0].style.visibility = "hidden";
      } else {
        swipe.navigation.$nextEl[0].style.opacity = "1";
        swipe.navigation.$nextEl[0].style.visibility = "visible";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.video__modal {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1000;
  display: flex;

  cursor: pointer;
  &-list {
    overflow: hidden;
    position: relative;
    padding: 20px;
    margin: auto;
    background: $main-bgcolor;
    border-radius: 24px;

    width: 1700px;
    height: 900px;
    cursor: default;
    display: flex;
  }
}
iframe {
  border-radius: 20px;
}
</style>