<template>
  <div class="episode">
    <button class="back" @click="$emit('backToSeasons', false)">Назад</button>
    <div class="episode__inner">
      <EpisodeBlockItem
        v-for="episode in seasonEpisodes"
        :key="episode.id"
        :episode="episode"
      ></EpisodeBlockItem>
    </div>
  </div>
</template>

<script>
import EpisodeBlockItem from "@/components/homePage/PageType/EpisodeBlockItem.vue";
export default {
  props: {
    seasonEpisodes: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  components: { EpisodeBlockItem },
};
</script>

<style lang="scss" scoped>
.episode {
  &__inner {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
}

.back {
  background: none;
  border: none;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  margin-bottom: 30px;
  &::before {
    display: inline-block;
    content: "";
    width: 12px;
    height: 12px;
    transition: all 0.2s ease 0s;

    border-left: 1px solid #999;
    border-top: 1px solid #999;
    transform: rotate(-45deg);
    position: relative;
  }
  &:hover {
    color: #ccc;
    &::before {
      border-color: #ccc;
    }
  }
}
</style>