<template>
  <div v-if="show" class="video__modal" @click.stop="hideDialog">
    <div @click.stop class="video__modal-list">
      <button ref="prev" @click="prevSlide" class="prev"></button>

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
      <div @click="hideDialog" class="close"></div>
    </div>
  </div>
</template>

<script>
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
    width: 1500px;
    height: 700px;
    cursor: default;
    display: flex;
    @media (max-width: 1600px) {
      .next {
        border: none;
        height: 10% !important;
        bottom: 0;
        top: 100% !important;
        left: 60%;
        transform: translate(-50%, 15%);
        width: 50px !important;
      }
      .prev {
        left: 40% !important;
        transform: translate(-40%, -20%);
      }
    }
    @media (max-width: 1200px) {
      width: 100vw;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      border-radius: 0;
      background: rgba(0, 0, 0, 1);

      iframe {
        width: 95vw;
        height: 85vh;
      }
      .close {
        left: 10px;
        top: 10px;
      }
      .next {
        height: 5% !important;
        top: 90% !important;
        left: 60%;
        transform: translate(-50%, 60%);
        width: 50px !important;
      }
      .prev {
        left: 40% !important;
        transform: translate(-40%, -20%);
      }
    }
    @media (max-width: 720px) {
      iframe {
        width: 95vw;
        height: 70vh;
      }
    }
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
.close {
  position: absolute;
  z-index: 100;
  right: -30px;
  top: -35px;
  display: flex;
  height: 24px;
  width: 24px;
  z-index: 1100;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::before {
    content: "";
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    width: 18px;
    height: 2px;
    background-color: #fff;
    transform: translate(-50%, -50%) rotate(45deg);
  }
}
</style>