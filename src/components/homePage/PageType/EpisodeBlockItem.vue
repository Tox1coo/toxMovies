<template>
  <div class="episode__block-item">
    <div class="episode__block-img">
      <img
        v-if="episode?.still_path != null || episode?.still_path != undefined"
        :src="`${IMAGE_URL}/original${episode.still_path}`"
        :alt="episode.name"
      />
    </div>

    <div class="episode__block-overview">
      <h3
        :style="{
          'font-size': 16 + 'px',
          'margin-bottom': 5 + 'px',
        }"
        class="title title--slider"
      >
        {{ episode.name }}
      </h3>
      <p class="text text--episode">
        {{ trimText(episode.overview, 184, "...") }}
      </p>
      <div class="episode__block-info_rating">
        <Star
          :vote_count="episode.vote_count"
          :vote_average="episode.vote_average"
        ></Star>
        <p class="text text--episode" v-if="episode.runtime">
          {{ episode.runtime }} min
        </p>
        <p class="text text--episode" v-else>min —</p>
      </div>
    </div>
  </div>
</template>
<!-- сделать проверку на null -->
<script>
import { mapState } from "vuex";
export default {
  props: {
    episode: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
  methods: {
    trimText(text, length, end = "") {
      let index = text.indexOf(" ", length);
      if (index == -1) index = length;
      if (text.length === 0) return;
      return text.slice(0, index) + end;
    },
  },
};
</script>

<style lang="scss" scoped>
.episode__block {
  &-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    position: relative;
    max-width: 400px;
    min-width: 400px;

    @media (max-width: 420px) {
      max-width: 300px;
      min-width: 300px;
    }
  }
  &-img {
    min-height: 200px;

    img {
      max-width: 400px;
      min-width: 400px;

      position: relative;
      z-index: 5;
      @media (max-width: 420px) {
        max-width: 300px;
        min-width: 300px;
        min-height: 200px;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      height: 64px;
      width: 64px;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -150%);
      background-image: url("../../../assets/error.png");
    }
  }
  &-overview {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  &-info {
    display: flex;
    flex-direction: column;
    &_rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 0 1;
      margin-top: 15px;
    }
  }
}
</style>