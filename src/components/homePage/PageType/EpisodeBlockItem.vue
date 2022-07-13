<template>
  <div class="episode__block-item">
    <img :src="`${IMAGE_URL}/w400${episode.still_path}`" :alt="episode.name" />
    <div class="episode__block-overview">
      <h3
        :style="{
          'font-size': 16 + 'px',
          'margin-bottom': 5 + 'px',
          flex: `1 1 auto`,
          height: '100%',
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
        <p class="text text--episode">{{ episode.runtime }} min</p>
      </div>
    </div>
  </div>
</template>

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
    width: 400px;
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