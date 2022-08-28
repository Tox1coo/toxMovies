<template>
  <div
    v-if="indexItem < visibleIndex"
    @click="
      $emit('showModal', {
        modal: true,
        key: imageItem.file_path,
        indexItem: indexImage,
      })
    "
    class="image__blocks-item"
  >
    <img v-if="imageURL != ''" class="image__img" :src="imageURL" />
  </div>
</template>

<script>
import lazyLoadingItem from "@/mixins/lazyLoadingItem";

import { mapState } from "vuex";
export default {
  data() {
    return {
      imageURL: "",
    };
  },
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
  mixins: [lazyLoadingItem],

  mounted() {
    this.getImageURL();
  },
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
  methods: {
    getImageURL() {
      setTimeout(() => {
        if (this.imageItem.file_path != null) {
          this.imageURL = `${this.IMAGE_URL}/w500${this.imageItem.file_path}`;
        }
      }, this.indexImage * 10);
    },
  },
};
// сделать ограничение по фото, чтобы не было ошибки 429 (слишком много запросов)
</script>

<style lang="scss" scoped>
.image__img {
  width: 100%;
  transition: all 0.2s ease 0s;
  height: 100%;
  position: relative;
  z-index: 2;
}
.image__blocks-item {
  background-color: rgba(#999, 0.2);
  cursor: pointer;
  width: 295px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: flex;
    top: 50%;
    height: 64px;
    width: 64px;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
    background-image: url("../../../assets/error.png");
  }
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