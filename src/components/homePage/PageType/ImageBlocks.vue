<template functionality>
  <div class="image__inner-top">
    <h2 class="title title--image">{{ titleBlock.toUpperCase() }}</h2>
    <span>{{ imageList.length }} photos</span>
  </div>

  <div class="image__blocks">
    <ImageBlocksItem
      v-for="(imageItem, index) in imageList"
      :key="index"
      :imageItem="imageItem"
      :indexItem="index"
      :visibleIndex="visibleItem"
      :indexImage="index"
      @showModal="getShowModal"
    ></ImageBlocksItem>
    <div v-intersection="loadMore" class="observer"></div>
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
import intersection from "@/components/directives/VIntersection";
import lazyLoading from "@/mixins/lazyLoading.js";

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
  directives: {
    intersection,
  },
  mixins: [lazyLoading],
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
  @media (max-width: 1000px) {
    justify-content: center;
  }
}

.image__inner-top {
  display: flex;
  align-items: flex-end;
  gap: 15px;
  @media (max-width: 620px) {
    padding-left: 10px;
  }
  span {
    color: #ccc;
    margin-bottom: 2px;
  }
}
</style>