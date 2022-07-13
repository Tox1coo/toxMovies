<template>
  <div class="video">
    <div class="video__top">
      <DropList :list="sortedVideos"></DropList> {{ sortedVideos.length }} Видео
    </div>
    <div class="video__body">
      <VideoBlockItem
        v-for="(video, index) in sortedVideos"
        :key="video.id"
        :sliderItem="video"
        @showModal="getShowModal"
        :indexItem="index"
      ></VideoBlockItem>
    </div>
    <ModalSlider
      :modalList="sortedVideos"
      :typeModal="'video'"
      v-model:currentModalItem="currentModalItem"
      v-model:currentIndexModalItem="currentIndexModalItem"
      v-model:show="showModal"
    ></ModalSlider>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VideoBlockItem from "@/components/homePage/PageType/VideoBlockItem.vue";

export default {
  data() {
    return {
      showModal: false,
      currentModalItem: "",
      currentIndexModalItem: 0,
    };
  },
  computed: {
    ...mapGetters({
      sortedVideos: "movies/sortedVideos",
    }),
  },
  components: { VideoBlockItem },
  methods: {
    getShowModal(info) {
      console.log(info);
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