<template>
  <div class="backdrop">
    <div v-if="isLoading" class="backdrop__inner">
      <div class="backdrop__left">
        <h1 class="title">
          {{ currentItem?.title || currentItem?.name }}
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
              <span v-if="currentItem?.vote_count !== 0"
                >{{ currentItem?.vote_count }} Отзывов</span
              >
              <span v-if="this.serial != null">
                Cезонов {{ serial?.last_episode_to_air?.season_number }}
              </span>
              - c
              {{
                new Date(currentItem?.first_air_date).getFullYear() ||
                new Date(currentItem?.release_date).getFullYear()
              }}
              <span v-if="rating">, Cert. {{ rating }}</span>
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
          class="backdrop__right-img lazyloading"
          :src="`${IMAGE_URL}/w780${currentItem?.backdrop_path}`"
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
      default: () => {},
    },
  },
  async mounted() {
    try {
      await this.getInfoItem();
      const config = {};

      setTimeout(() => {
        if (this.serial != null) {
          config.media_type = "tv";
          config.language = "ru";
          config.id = this.serial.id;
        } else {
          config.media_type = "movie";
          config.language = "ru";
          config.id = this.film.id;
        }
        this.getTrailerVideoList(config);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapActions({
      getSerials: "movies/getSerials",
      getFilm: "movies/getFilm",
      getTrailerVideoList: "movies/getTrailerVideoList",
    }),
    async getInfoItem() {
      try {
        if (this.infoItem?.length > 1) {
          let flag = true;
          do {
            const indexRandom = Math.floor(
              0 + Math.random() * (this.infoItem.length + 1 - 0)
            );
            const random = this.infoItem[indexRandom];

            if (
              random?.backdrop_path != null &&
              random?.backdrop_path != undefined
            ) {
              this.currentItem = this.infoItem[indexRandom];
              flag = false;
            }
          } while (flag);
          if (this.currentItem?.name != undefined) {
            await this.getSerials(this.currentItem?.id);
          } else {
            await this.getFilm(this.currentItem?.id);
          }
        } else {
          this.currentItem = this.infoItem;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = true;
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
  watch: {
    infoItem(newInfoItem) {
      this.getInfoItem();
      const config = {};
      if (this.serial != null) {
        config.media_type = "tv";
        config.language = "ru";
        config.id = this.serial.id;
      } else {
        config.media_type = "movie";
        config.language = "ru";
        config.id = this.film.id;
      }
      this.getTrailerVideoList(config);
    },
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
    animation: loading 0.7s ease-in-out;
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
        transparent 70%,
        transparent
      );
    }
  }
}

.rating {
  margin-top: 10px;
  margin-bottom: 15px;

  &__inner {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 0.75;
    color: #999;
  }

  &__info {
    font-size: 17px;

    span {
      margin-right: 5px;
    }
  }
}

@keyframes loading {
  0% {
    transform: translateY(100px);
    opacity: 0.2;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>