<template>
  <div ref="list" class="category">
    <div class="category__link">
      <h2>
        {{ title }}
      </h2>
      <a
        v-if="showIsAll"
        @click="this.$router.push(`${media}/category/${typeCategory}`)"
        >Explore All</a
      >
    </div>

    <swiper
      v-if="mediaTypeList?.length > 0"
      :slidesPerView="7.3"
      :spaceBetween="20"
      :slidesPerGroup="7"
      :navigation="true"
      :grab-cursor="true"
      @transitionEnd="onSwipe"
    >
      <swiper-slide
        ref="swipeItem"
        v-for="categoryItem in mediaTypeList"
        :key="categoryItem.id"
      >
        <CategoryItem :media="media" :categoryItem="categoryItem"></CategoryItem
      ></swiper-slide>
      <swiper-slide>
        <a
          v-if="showIsAll"
          @click="this.$router.push(`${media}/category/${typeCategory}`)"
        >
          <div class="category__all">Explore All</div>
        </a>
      </swiper-slide>
    </swiper>
    <img
      v-else
      class="empty"
      :src="require('@/assets/empty-folder.png')"
      alt=""
    />
  </div>
</template>

<script>
/*  eslint-disable no-unused-vars  */

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
import CategoryItem from "@/components/homePage/Category/CategoryItem.vue";
export default {
  data() {
    return {
      viewItemSlide: 0,
      currentSlide: 0,
      slidesPerGroup: 0,
      checkLeft: false,
    };
  },
  props: {
    mediaTypeList: Object,
    typeCategory: String,
    media: String,
    title: {
      type: String,
      required: true,
    },
    showIsAll: {
      type: Boolean,
      default: true,
    },
  },
  components: { CategoryItem, Swiper, SwiperSlide },
  mounted() {
    document.querySelectorAll(".swiper-button-prev").forEach((element) => {
      element.style.cssText = "opacity: 0 !important; visibility: hidden";
    });
    /*     const viewItemSlide = this.mediaTypeList.length / 2;
    this.viewItemSlide = viewItemSlide;
    this.slidesPerGroup = Math.floor(this.mediaTypeList.length / 2);
    setTimeout(() => {
      console.log(this.$refs.swipeItem);
    }, 500); */
  },
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
  watch: {
    currentSlide(newCurrent) {
      if (newCurrent === 0) {
        this.checkLeft = false;
      }
    },
  },
};
</script>

<style lang="scss">
.category {
  padding-left: 50px;
  position: relative;
  margin-right: 50px;
  &__all {
    min-width: 215px;
    max-height: 324px;
    background-color: #202124;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    min-height: 324px;
    color: #1d95dc;
    left: 0;
    transition: all 0.2s ease 0s;
    min-height: 355px;
    max-height: 355px;
    &:hover {
      color: #5b68ff;
      background-color: #1b1c1d;
    }
  }
  &__link {
    display: flex;
    align-items: flex-end;
    margin-bottom: 25px;

    gap: 7px;
    a {
      margin-bottom: 2px;
      color: #1d95dc;
      cursor: pointer;
      transition: color 0.1s ease 0s;
      &:hover {
        color: #5b68ff;
      }
    }
  }
}
.swiper {
  overflow: visible;
  &-container {
    overflow: visible;
  }
  &-button-prev {
    height: 79% !important;
    top: 22px;
    left: -50px !important;
    transition: all 0.2s ease 0s;
    width: 52px !important;
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  &-button-next {
    @extend .swiper-button-prev;
    left: auto !important;
    right: -50px;
  }
}
</style>