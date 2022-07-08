<template>
  <div class="category__item">
    <div
      @click="$router.push(`/${categoryItem.media_type}/${categoryItem.id}`)"
      class="category__item-img"
    >
      <img
        class="lazyloading"
        :src="`${IMAGE_URL}/w342/${categoryItem?.poster_path}`"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    categoryItem: {
      type: Object,
    },
  },

  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
};
</script>

<style lang="scss" scoped>
.category__item {
  cursor: pointer;
  &-img {
    width: 250px;
    height: 350px;
    background-color: #202124;
    img {
      height: 100%;
      width: 100%;
      transform: scale(1);

      transition: all 0.2s ease 0s;
    }
  }
  &:hover {
    & .category__item-img img {
      transform: scale(1.02);
      border-radius: 15px;
    }
  }
}
</style>