<template>
  <div class="image">
    <div class="image__inner">
      <ImageBlocks
        v-for="(image, key) in imagesList"
        :key="key"
        :imageList="image"
        :titleBlock="key"
      ></ImageBlocks>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ImageBlocks from "@/components/homePage/PageType/ImageBlocks.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      imagesList: (state) => state.movies.imagesList,
    }),
  },
  components: { ImageBlocks },
};
</script>

<style lang="scss" scoped>
.image {
  padding: 30px 30px 50px 50px;
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
</style>