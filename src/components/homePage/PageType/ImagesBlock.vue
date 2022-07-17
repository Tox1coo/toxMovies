<template>
  <div class="image">
    <div class="image__inner">
      <ImageBlocks
        v-for="(image, key) in itemPhoto"
        :key="key"
        :imageList="image"
        :titleBlock="key"
      ></ImageBlocks>
    </div>
  </div>
</template>

<script>
import ImageBlocks from "@/components/homePage/PageType/ImageBlocks.vue";
export default {
  data() {
    return {};
  },
  props: {
    itemPhoto: {
      type: Object,
    },
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
  @media (max-width: 650px) {
    padding: 30px 0 50px;
  }
}
</style>