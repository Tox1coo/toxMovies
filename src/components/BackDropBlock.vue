<template>
  <div class="backdrop">
    <div class="backdrop__inner">
      <div class="backdrop__left">
        <h1 class="title">
          {{ this.currentItem?.title || this.currentItem?.name }}
        </h1>

        <div class="rating">
          <div class="rating__inner star">
            <Star
              v-if="
                currentItem?.vote_average != 0 &&
                currentItem?.vote_average != undefined
              "
              :vote_average="currentItem?.vote_average"
              :vote_count="currentItem?.vote_count"
            ></Star>
            <div class="rating__info">
              <span v-if="this.serial != null">
                Cезонов
                {{ this.serial?.last_episode_to_air?.season_number }} - c
                {{ new Date(this.serial?.first_air_date).getFullYear() }}, Cert.
                {{ rating }}
              </span>
            </div>
          </div>
        </div>
        <div class="overwiew">
          <p class="text">{{ currentItem?.overview }}</p>
        </div>
        <TrailerButton></TrailerButton>
      </div>
      <div class="backdrop__right">
        <img
          class="backdrop__right-img"
          :src="`${IMAGE_URL}/w780	${currentItem?.backdrop_path}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      currentItem: {},
      isLoading: false,
    };
  },
  props: {
    infoItem: {
      type: [Array, Object],
    },
  },
  async mounted() {
    try {
      setTimeout(() => {
        this.getInfoItem();
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      this.isLoading = true;
    }
  },
  methods: {
    ...mapActions({
      getSerials: "movies/getSerials",
      getFilm: "movies/getFilm",
    }),
    async getInfoItem() {
      if (this.infoItem?.length > 1) {
        this.currentItem = await this.infoItem[
          Math.floor(0 + Math.random() * (this.infoItem.length + 1 - 0))
        ];
        if (this.currentItem?.name != undefined) {
          this.getSerials(this.currentItem?.id);
        } else {
          this.getFilm(this.currentItem?.id);
        }
      }
    },
  },
  computed: {
    ...mapState({
      serial: (state) => state.movies.serial,
      film: (state) => state.movies.film,
      rating: (state) => state.movies.rating,
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  width: 100%;
  height: 600px;
  background-color: $navbar-bgcolor;
  border-bottom: 1px solid rgba(#ccc, 0.2);
  position: relative;
  z-index: 1000;
  &__inner {
    display: flex;
    position: relative;
  }

  &__left {
    position: relative;
    width: 50%;
    z-index: 1000;
    padding-top: 150px;
    padding-left: 50px;
  }

  &__right {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    width: 71.1%;
    height: 599px;
    &-img {
      height: 599px;
      width: 100%;
    }
    &::after {
      content: "";
      height: 599px;
      position: absolute;
      display: block;
      z-index: 100;
      width: 100%;
      top: 0;
      background-image: linear-gradient(
        90deg,
        #000 0,
        transparent 80%,
        transparent
      );
    }
  }
}

.rating {
  &__inner {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 0.75;
    color: #999;
  }

  &__info {
    font-size: 17px;
    padding-left: 15px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>