<template>
  <div class="season">
    <div class="season__inner">
      <div v-if="!visibleEpisodeList" class="season__inner-season">
        <SeasonBlockList
          v-for="(season, index) in seasonInfo"
          :key="season.id"
          :indexItem="index"
          :visibleIndex="visibleItem"
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
      <div
        v-if="seasonInfo.length > 0"
        v-intersection="loadMore"
        class="observer"
      ></div>
    </div>
  </div>
</template>
<script>
import intersection from "@/components/directives/VIntersection";
import lazyLoading from "@/mixins/lazyLoading.js";
import SeasonBlockList from "@/components/homePage/PageType/SeasonBlockList.vue";
import EpisodeBlock from "@/components/homePage/PageType/EpisodeBlock.vue";
import { getEpisodesTVShows } from "@/api";
export default {
  data() {
    return {
      visibleEpisodeList: false,
      season: 0,
      seasonInfo: [],
    };
  },

  props: {
    tvShow: { type: Object, required: true },
  },

  async created() {
    const length = this.tvShow.number_of_seasons;
    let seasonList = [];
    for (let index = 0; index < length; index++) {
      let indexSeason = index;
      seasonList = await getEpisodesTVShows(this.tvShow.id, ++indexSeason);
      this.seasonInfo.push(seasonList);
    }
  },

  directives: {
    intersection,
  },

  mixins: [lazyLoading],

  components: { SeasonBlockList, EpisodeBlock },

  methods: {
    async showEpisodes(config) {
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
      @media (max-width: 900px) {
        justify-content: center;
      }
    }
    @media (max-width: 650px) {
      padding: 30px 0 50px;
    }
  }
}
</style>