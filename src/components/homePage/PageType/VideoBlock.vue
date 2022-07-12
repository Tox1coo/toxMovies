<template>
  <div class="video">
    <div class="video__top">
      <DropList :list="sortedVideos"></DropList> {{ sortedVideos.length }} Видео
    </div>
    <div class="video__body"></div>
    <ModalSlider
      :modalList="sortedVideos"
      :typeModal="'video'"
      v-model:show="showModal"
    ></ModalSlider>
  </div>
</template>
<!-- TODO: продумать как сделать слайдер с видео и фото -->
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showModal: true,
    };
  },
  computed: {
    ...mapGetters({
      sortedVideos: "movies/sortedVideos",
    }),
  },
};
</script>

<style lang="scss" scoped>
.video {
  padding: 30px 50px 50px 50px;
}
</style>