<template >
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
              <span v-if="currentItem?.seasons != undefined">
                Seasons {{ currentItem?.last_episode_to_air?.season_number }},
              </span>
              <span
                v-if="
                  currentItem?.first_air_date != '' &&
                  currentItem?.release_date != ''
                "
              >
                {{
                  new Date(currentItem?.first_air_date).getFullYear() ||
                  new Date(currentItem?.release_date).getFullYear()
                }}</span
              >
              <span v-if="currentItem?.content_ratings?.results[0]?.rating"
                >, Cert.
                {{ currentItem?.content_ratings?.results[0]?.rating }}</span
              >
            </div>
          </div>
        </div>
        <div class="backdrop__overview">
          <p class="text">{{ currentItem?.overview }}</p>
        </div>
        <TrailerButton class="trailer"></TrailerButton>
      </div>
      <div v-if="getImage != ''" class="backdrop__right">
        <img class="backdrop__right-img lazyloading" :src="getImage" />
      </div>
    </div>
  </div>
  <ModalTrailer
    v-if="isLoading"
    :trailerURL="getTrailerItem"
    :show="showTrailer"
  ></ModalTrailer>
</template>

<script>
/* eslint-disable no-unused-vars */

import { mapState } from "vuex";
import { getMovie, getTVShow, getTrailer } from "@/api";
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
    await this.getInfoItem();
  },
  methods: {
    async getInfoItem() {
      try {
        if (this.infoItem?.length > 1) {
          let flag = true;
          do {
            var indexRandom = Math.floor(
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
            this.currentItem = await getTVShow(this.infoItem[indexRandom]?.id);
          } else {
            this.currentItem = await getMovie(this.infoItem[indexRandom]?.id);
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
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
      showTrailer: (state) => state.movies.showTrailer,
    }),

    getImage() {
      return `${this.IMAGE_URL}/w780${this.currentItem?.backdrop_path}`;
    },
    getTrailerItem() {
      return getTrailer(this.currentItem);
    },
  },
  watch: {
    infoItem() {
      this.getInfoItem();
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
  z-index: 998;
  &__overview {
    @media (max-width: 600px) {
      display: none;
    }
  }
  @media (max-width: 650px) {
    height: 500px;
  }
  @media (max-width: 400px) {
    height: 400px;
  }
  &__inner {
    display: flex;
    height: 100%;
    position: relative;
    @media (max-width: 1050px) {
      flex-direction: column;
    }
  }

  &__left {
    position: relative;
    width: 50%;
    z-index: 1000;
    padding-top: 150px;
    padding-left: 50px;
    animation: loading 0.7s ease-in-out;
    @media (max-width: 1050px) {
      position: absolute;
      bottom: 70px;
      width: 98%;

      padding-top: 0;
    }
    @media (max-width: 800px) {
      position: relative;
      order: 2;
    }
    @media (max-width: 500px) {
      padding-left: 20px;
    }
    @media (max-width: 500px) {
      bottom: 30px;
    }
  }

  &__right {
    position: absolute;
    right: 0;
    top: 0;
    display: block;
    width: 71.1%;
    height: calc(100% - 1px);
    @media (max-width: 1050px) {
      position: relative;
      width: 100%;
    }
    @media (max-width: 800px) {
      order: 1;
    }
    &-img {
      height: calc(100% - 1px);

      width: 100%;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        display: flex;
        top: 50%;
        height: 64px;
        width: 64px;
        left: 50%;
        z-index: 831;
        transform: translate(-50%, -50%);
        background-image: url("../assets/error.png");
      }
    }
    &::after {
      content: "";
      height: 100%;

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
      @media (max-width: 1050px) {
        background-image: linear-gradient(
          360deg,
          #000 0,
          transparent 100%,
          transparent
        );
      }
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
    @media (max-width: 550px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
  }

  &__info {
    font-size: 17px;
    line-height: 1.2;
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

