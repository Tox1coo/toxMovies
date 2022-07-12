<template>
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
        <transition-group name="info">
          <OverviewBlock
            v-if="currentTab.title === 'Overview'"
            :overviewItem="pageItem"
            :director="directoryFilm"
            :castList="castList"
          ></OverviewBlock>
        </transition-group>

        <transition name="info">
          <VideoBlock v-if="currentTab.title === 'Videos'"></VideoBlock>
        </transition>
      </div>
      <CategoryList
        :mediaTypeList="similarList"
        :showIsAll="false"
        :typeCategory="'Посмотреть еще'"
      ></CategoryList>
    </div>
  </div>
</template>
<!-- TODO: проверить правильность выбора трейлера после перехода по ссылке на фильмах и сериалах 'Посмотреть еще' -->
<script>
import BackDropBlock from "@/components/BackDropBlock";
import { mapActions, mapState } from "vuex";
import OverviewBlock from "@/components/homePage/PageType/OverviewBlock.vue";
import CategoryList from "@/components/homePage/Category/CategoryList.vue";
import VideoBlock from "@/components/homePage/PageType/VideoBlock.vue";
export default {
  name: "PageItem",
  data() {
    return {
      pageItem: {},
      id: this.$route.params.id,
      media: this.$route.params.media,
      isLoading: false,
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
  components: { BackDropBlock, OverviewBlock, CategoryList, VideoBlock },
  methods: {
    ...mapActions({
      getFilm: "movies/getFilm",
      getSerials: "movies/getSerials",
      getCreditsInfo: "movies/getCreditsInfo",
      getSimilar: "movies/getSimilar",
    }),
    setCurrentTab(currentTab) {
      this.prevTab = this.currentTab;
      this.currentTab = currentTab;
    },
    async getItem() {
      try {
        if (this.media === "tv") {
          await this.getSerials(this.id);
          this.pageItem = this.serial;
          this.tabsList = [
            {
              title: "Overview",
              id: 0,
            },
            { title: "Episodes", id: 1 },
            { title: "Videos", id: 2 },
            { title: "Photos", id: 3 },
          ];
          const config = {
            media_type: this.media,
            id: this.id,
          };
          await this.getCreditsInfo(config);
          await this.getOverviewInfo();

          this.isLoading = true;
        } else {
          await this.getFilm(this.id);
          this.tabsList = [
            {
              title: "Overview",
              id: 0,
            },
            { title: "Videos", id: 1 },
            { title: "Photos", id: 2 },
          ];
          setTimeout(async () => {
            this.pageItem = this.film;
            const config = {
              media_type: this.media,
              id: this.id,
            };
            await this.getCreditsInfo(config);
            await this.getOverviewInfo();
            this.isLoading = true;
          }, 500);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getOverviewInfo() {
      this.castList = this.creditsItem.cast;
      this.directoryFilm = await this.creditsItem.crew.filter(
        (crewPerson) => crewPerson.job === "Director"
      );
      const config = {
        media_type: this.media,
        id: this.id,
      };
      await this.getSimilar(config);
    },
    resetData() {
      this.currentTab = {
        title: "Overview",
        id: 0,
      };
      this.prevTab = this.currentTab;
    },
  },

  async created() {
    this.getItem();
  },
  updated() {
    this.id = this.$route.params.id;
  },
  computed: {
    ...mapState({
      film: (state) => state.movies.film,
      serial: (state) => state.movies.serial,
      creditsItem: (state) => state.movies.creditsItem,
      similarList: (state) => state.movies.similarList,
    }),
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
.page {
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