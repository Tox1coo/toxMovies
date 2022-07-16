<template v-if="titleBlock !== 'logos'">
  <div class="image__inner-top">
    <h2 class="title title--image">{{ titleBlock.toUpperCase() }}</h2>
    <span>{{ imageList.length }} фото</span>
  </div>

  <div class="image__blocks">
    <ImageBlocksItem
      v-for="(imageItem, index) in imageList"
      :key="index"
      :imageItem="imageItem"
      :indexImage="index"
      @showModal="getShowModal"
    ></ImageBlocksItem>
  </div>
  <ModalSlider
    v-if="showModal"
    v-model:show="showModal"
    :typeModal="'photo'"
    :modalList="imageList"
    v-model:currentIndexModalItem="currentIndexModalItem"
    v-model:currentModalItem="currentModalItem"
  ></ModalSlider>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import ImageBlocksItem from "@/components/homePage/PageType/ImageBlocksItem.vue";
export default {
  data() {
    return {
      showModal: false,
      currentIndexModalItem: 0,
      currentModalItem: "",
    };
  },
  props: {
    imageList: {
      type: Array,
      default: () => [],
    },
    titleBlock: String,
  },
  methods: {
    getShowModal(info) {
      this.showModal = info.modal;
      this.currentIndexModalItem = info.indexItem;
      this.currentModalItem = info.key;
    },
  },
  components: { ImageBlocksItem },
};
</script>

<style lang="scss" scoped>
.image__blocks {
  display: flex;
  gap: 11px;
  flex-wrap: wrap;
}

.image__inner-top {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  span {
    color: #ccc;
    margin-bottom: 2px;
  }
}
</style>