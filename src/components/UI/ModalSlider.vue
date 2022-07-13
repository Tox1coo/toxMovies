<template>
  <div v-if="show" class="video__modal" @click.stop="hideDialog">
    <div @click.stop class="video__modal-list">
      <button ref="prev" @click="prevSlide" class="prev"></button>

      <!-- <swiper
        :slidesPerView="1"
        :slidesPerGroup="1"
        :navigation="true"
        @transitionEnd="onSwipe"
      >
        <swiper-slide v-for="modalItem in modalList" :key="modalItem.id">
          <ModalSliderItem :trailerKey="modalItem.key"></ModalSliderItem>
        </swiper-slide>
      </swiper> -->

      <ModalSliderItem
        v-if="isLoading"
        :typeModal="typeModal"
        :trailerKey="
          modalList[currentIndexModalItem]?.key ||
          modalList[currentIndexModalItem]?.file_path
        "
      ></ModalSliderItem>

      <button ref="next" @click="nextSlide" class="next"></button>

      <div class="video__modal-counter">
        {{ currentIndexModalItem + 1 }} / {{ modalList.length }}
      </div>
    </div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from "swiper/vue";

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
  data() {
    return {
      isLoading: true,
    };
  },
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
    currentIndexModalItem: {
      type: Number,
      default: 0,
      required: true,
    },
    currentModalItem: {
      type: String,
      default: "",
    },
  },
  // components: { Swiper, SwiperSlide },

  mixins: [toggleMixins],
  methods: {
    nextSlide() {
      if (this.currentIndexModalItem < this.modalList.length - 1) {
        try {
          this.isLoading = false;

          this.$emit(
            "update:currentModalItem",
            this.modalList[this.currentIndexModalItem + 1].key ||
              this.modalList[this.currentIndexModalItem]?.filePath
          );
          this.$emit(
            "update:currentIndexModalItem",
            this.currentIndexModalItem + 1
          );
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = true;
        }
      }
    },
    prevSlide() {
      if (this.currentIndexModalItem > 0) {
        try {
          this.isLoading = false;

          this.$emit(
            "update:currentModalItem",
            this.modalList[this.currentIndexModalItem - 1].key ||
              this.modalList[this.currentIndexModalItem]?.filePath
          );
          this.$emit(
            "update:currentIndexModalItem",
            this.currentIndexModalItem - 1
          );
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = true;
        }
      }
    },
    checkButton(index) {
      if (index === 0) {
        this.$refs.prev.style.opacity = 0;
        this.$refs.prev.style.visibility = "hidden";
      } else {
        this.$refs.prev.style.opacity = 1;
        this.$refs.prev.style.visibility = "visible";
      }
      if (index === this.modalList.length - 1) {
        this.$refs.next.style.opacity = 0;
        this.$refs.next.style.visibility = "hidden";
      } else {
        this.$refs.next.style.opacity = 1;
        this.$refs.next.style.visibility = "visible";
      }
    },
  },
  watch: {
    currentIndexModalItem(index) {
      if (this.show) {
        setTimeout(() => {
          this.checkButton(index);
        }, 200);
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
    position: relative;
    padding: 20px;
    margin: auto;
    background: $main-bgcolor;
    border-radius: 24px;
    display: flex;
    border: 1px solid rgba(#999, 0.4);
    justify-content: center;
    align-items: center;
    width: 1700px;
    height: 900px;
    cursor: default;
    display: flex;
  }
  .next {
    background: rgba($color: #1f1f1f, $alpha: 1);
    border: none;
    height: 100%;
    top: -5px;
    cursor: pointer;
    position: absolute;
    right: -90px;
    width: 50px;
    z-index: 1000;
    display: flex;
    align-items: center;
    transition: all 0.3s ease 0s;
    justify-content: center;
    &::after {
      display: block;
      margin-right: 15px;
      content: "";
      position: absolute;
      width: 24px;
      z-index: 1000;
      height: 24px;
      border-right: 1px solid #fff;
      border-bottom: 1px solid #fff;
      transform: rotate(320deg);
    }
  }
  .prev {
    @extend .next;
    right: auto;
    left: -90px;

    &::after {
      transform: rotate(130deg);
      margin-right: 0;
      margin-left: 15px;
    }
  }

  &-counter {
    position: absolute;
    bottom: -30px;
    right: 30px;
  }
}
iframe {
  border-radius: 20px;
}
</style>