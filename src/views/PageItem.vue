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
        <OverviewBlock
          :overviewItem="pageItem"
          :director="directoryFilm"
          :castList="castList"
        ></OverviewBlock>
      </div>
    </div>
  </div>
</template>

<script>
import BackDropBlock from "@/components/BackDropBlock";
import { mapActions, mapState } from "vuex";
import OverviewBlock from "@/components/homePage/PageType/OverviewBlock.vue";
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
  components: { BackDropBlock, OverviewBlock },
  methods: {
    ...mapActions({
      getFilm: "movies/getFilm",
      getSerials: "movies/getSerials",
      getCreditsInfo: "movies/getCreditsInfo",
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
            media_type: "tv",
            id: this.serial.id,
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
              media_type: "movie",
              id: this.film.id,
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
    getOverviewInfo() {
      this.castList = this.creditsItem.cast;
      this.directoryFilm = this.creditsItem.crew.filter(
        (crewPerson) => crewPerson.job === "Director"
      );
    },
  },
  async created() {
    this.getItem();
  },
  computed: {
    ...mapState({
      film: (state) => state.movies.film,
      serial: (state) => state.movies.serial,
      creditsItem: (state) => state.movies.creditsItem,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>