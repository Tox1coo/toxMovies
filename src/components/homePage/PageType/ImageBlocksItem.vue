<template>
  <div
    @click="
      $emit('showModal', {
        modal: true,
        key: imageItem.file_path,
        indexItem: indexImage,
      })
    "
    class="image__blocks-item"
  >
    <img
      class="image__img"
      :src="`${IMAGE_URL}/w500${imageItem.file_path}`"
      :alt="imageItem.file_path"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    imageItem: {
      type: Object,
      default: () => {},
    },
    indexImage: {
      type: Number,
      default: 0,
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
.image__img {
  width: 300px;
  transition: all 0.2s ease 0s;
  height: 100%;
}
.image__blocks-item {
  background-color: rgba(#999, 0.2);
  cursor: pointer;
  width: 310px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    img {
      transform: scale(1.02);
      border-radius: 15px;
    }
    border-radius: 15px;
  }
  transition: border-radius 0.2s ease 0s;
  border: 1px solid rgba(#999, 0.5);
}
</style>