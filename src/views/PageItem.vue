<template>
  <BackDropBlock v-if="isLoading" :infoItem="pageItem"></BackDropBlock>
  <div class="page">
    <div class="page__inner">
      <Tabs
        @setCurrentTab="setCurrentTab"
        :currentTab="currentTab"
        :tabsList="tabsList"
      ></Tabs>
      <div class="page__info">
        <OverviewBlock :overviewItem="pageItemx"></OverviewBlock>
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
      currentTab: {
        title: "Overview",
        id: 0,
      },
    };
  },
  components: { BackDropBlock, OverviewBlock },
  methods: {
    ...mapActions({
      getFilm: "movies/getFilm",
      getSerials: "movies/getSerials",
    }),
    setCurrentTab(currentTab) {
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
        } else {
          await this.getFilm(this.id);
          this.pageItem = this.film;
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
        console.log(error);
      } finally {
        this.isLoading = true;
      }
    },
  },
  async created() {
    this.getItem();
  },
  computed: {
    ...mapState({
      film: (state) => state.movies.film,
      serial: (state) => state.movies.serial,
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>