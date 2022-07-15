<template>
  <div class="season">
    <div class="season__inner">
      <div v-if="!visibleEpisodeList" class="season__inner-season">
        <SeasonBlockList
          v-for="season in seasonInfo"
          :key="season.id"
          :seasonInfo="season"
          @showEpisodes="showEpisodes"
        ></SeasonBlockList>
      </div>
      <div v-else-if="visibleEpisodeList" class="season__inner-season">
        <EpisodeBlock
          @backToSeasons="backToSeasons"
          :seasonEpisodes="seasonInfo[season - 1].episodes"
        ></EpisodeBlock>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import SeasonBlockList from "@/components/homePage/PageType/SeasonBlockList.vue";
import EpisodeBlock from "@/components/homePage/PageType/EpisodeBlock.vue";
export default {
  data() {
    return {
      visibleEpisodeList: false,
      season: 0,
    };
  },
  computed: {
    ...mapState({
      seasonInfo: (state) => state.movies.seasonInfo,
    }),
  },
  components: { SeasonBlockList, EpisodeBlock },
  methods: {
    showEpisodes(config) {
      this.visibleEpisodeList = config.visibleEpisodeList;
      this.season = config.season;
    },
    backToSeasons(isShow) {
      this.visibleEpisodeList = isShow;
      this.season = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.season {
  &__inner {
    padding: 30px 30px 50px 50px;

    &-season {
      display: flex;
      flex-wrap: wrap;
      gap: 27px;
    }
  }
}
</style>