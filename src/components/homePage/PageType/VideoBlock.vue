<template>
  <div class="video">
    <div class="video__top">
      <DropList v-model:sortedItem="sortedItem" :list="sorted"></DropList>
      {{ sorted.length }} Videos
    </div>
    <div class="video__body">
      <VideoBlockItem
        v-for="(video, index) in sorted"
        :key="video.id"
        :sliderItem="video"
        @showModal="getShowModal"
        :indexItem="index"
      ></VideoBlockItem>
    </div>
    <ModalSlider
      :modalList="sorted"
      :typeModal="'video'"
      v-model:currentModalItem="currentModalItem"
      v-model:currentIndexModalItem="currentIndexModalItem"
      v-model:show="showModal"
    ></ModalSlider>
  </div>
</template>
<script>
import VideoBlockItem from "@/components/homePage/PageType/VideoBlockItem.vue";
import { sortedVideos } from "@/api";
export default {
  data() {
    return {
      showModal: false,
      currentModalItem: "",
      currentIndexModalItem: 0,
      sortedItem: "All",
    };
  },
  props: {
    itemVideos: {
      type: Array,
    },
  },
  computed: {
    sorted() {
      return sortedVideos(this.itemVideos, this.sortedItem);
    },
  },
  components: { VideoBlockItem },
  methods: {
    getShowModal(info) {
      this.showModal = info.modal;
      this.currentModalItem = info.key;
      this.currentIndexModalItem = info.indexItem;
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  padding: 30px 30px 50px 50px;
  &__body {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 25px;
    position: relative;
  }
}
</style>