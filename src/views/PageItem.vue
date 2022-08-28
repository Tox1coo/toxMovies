<template>
  <Back></Back>

  <BackDropBlock v-if="isLoading" :infoItem="pageItem"></BackDropBlock>
  <div v-if="isLoading" class="page">
    <div class="page__inner">
      <Tabs
        @setCurrentTab="setCurrentTab"
        :currentTab="currentTab"
        :tabsList="tabsList"
        :prevId="prevTab"
      ></Tabs>
      <div class="page__info">
        <OverviewBlock
          v-if="currentTab.title === 'Overview'"
          :overviewItem="pageItem"
          :director="getDirectoryFilm"
          :castList="getCastList"
        ></OverviewBlock>
        <VideoBlock
          :itemVideos="pageItem.videos.results"
          v-if="currentTab.title === 'Videos'"
        ></VideoBlock>
        <ImagesBlock
          :itemPhoto="pageItem.images"
          v-if="currentTab.title === 'Photos'"
        ></ImagesBlock>
        <SeasonBlock
          :tvShow="pageItem"
          v-if="currentTab.title === 'Seasons'"
        ></SeasonBlock>
      </div>
      <CategoryList
        :mediaTypeList="pageItem.similar.results"
        :media="$route.params.media"
        :showIsAll="false"
        :title="'See more'"
      ></CategoryList>
    </div>
  </div>
</template>

<script>
import BackDropBlock from "@/components/BackDropBlock";
import { getMovie, getTVShow } from "@/api";
import OverviewBlock from "@/components/homePage/PageType/OverviewBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
import VideoBlock from "@/components/homePage/PageType/VideoBlock.vue";
import ImagesBlock from "@/components/homePage/PageType/ImagesBlock.vue";
import SeasonBlock from "../components/homePage/PageType/SeasonBlock.vue";
import { mapMutations, mapState } from "vuex";
export default {
  name: "PageItem",
  data() {
    return {
      pageItem: {},
      id: this.$route.params.id,
      media: this.$route.params.media,
      tabsList: [],
      prevTab: {
        title: "Overview",
        id: 0,
      },
      currentTab: {
        title: "Overview",
        id: 0,
      },
      castList: [],
      directoryFilm: {},
    };
  },
  components: {
    BackDropBlock,
    OverviewBlock,
    CategoryList,
    VideoBlock,
    ImagesBlock,
    SeasonBlock,
  },

  methods: {
    ...mapMutations({
      setIsLoading: "movies/setIsLoading",
      updateError: "movies/updateError",
    }),
    setCurrentTab(currentTab) {
      this.prevTab = this.currentTab;
      this.currentTab = currentTab;
    },
    async getItem() {
      try {
        if (this.media === "tv") {
          this.pageItem = await getTVShow(this.id);
          this.tabsList = [
            {
              title: "Overview",
              id: 0,
            },
            { title: "Seasons", id: 1 },
            { title: "Videos", id: 2 },
            { title: "Photos", id: 3 },
          ];
        } else {
          this.pageItem = await getMovie(this.id);
          this.tabsList = [
            {
              title: "Overview",
              id: 0,
            },
            { title: "Videos", id: 1 },
            { title: "Photos", id: 2 },
          ];
        }
      } catch (error) {
        this.$router.push("/notfound");
        this.updateError("Page not found");
      } finally {
        this.setIsLoading(true);
      }
    },

    resetData() {
      this.currentTab = {
        title: "Overview",
        id: 0,
      };
      this.prevTab = this.currentTab;
    },
  },
  beforeUnmount() {
    this.setIsLoading(false);
  },
  async mounted() {
    this.getItem();
  },
  updated() {
    this.id = this.$route.params.id;
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
    }),
    getDirectoryFilm() {
      return this.pageItem.credits.crew.filter(
        (crewPerson) => crewPerson.job === "Director"
      );
    },
    getCastList() {
      return this.pageItem.credits.cast;
    },
  },
  watch: {
    id() {
      this.resetData();

      this.getItem();
    },
  },
};
</script>

<style lang="scss" scoped>
.back--item {
  @media (max-width: 690px) {
    display: none !important;
  }
}
.page {
  position: relative;
  overflow: hidden;
}
.info-enter-active {
  animation: info 0.5s;
}
.info-leave-active {
  animation: info 0.5s easy;
}

@keyframes info {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>