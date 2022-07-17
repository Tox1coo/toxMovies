<template>
  <div v-if="isLoading" class="person">
    <div class="person__inner">
      <div class="person__img">
        <img
          v-if="personInfo?.profile_path != null"
          :src="`${IMAGE_URL}/w370_and_h556_bestv2${personInfo.profile_path}`"
          alt=""
        />
      </div>
      <PersonOverview :person="personInfo"></PersonOverview>
      <!-- сделать проверку по возрасту -->
    </div>
    <Tabs
      :tabsList="tabList"
      :currentTab="currentTab"
      :prevId="prevTab"
      @setCurrentTab="setCurrentTab"
    ></Tabs>
    <ImagesBlock
      v-if="currentTab.title === 'Photos'"
      :itemPhoto="personInfo.images"
    ></ImagesBlock>
    <CreditPerson
      v-if="currentTab.title === 'Credits'"
      :personCredits="personInfo.combined_credits"
    ></CreditPerson>
    <KnowForPerson
      v-if="currentTab.title === 'Known For'"
      :knowforPerson="[
        ...personInfo?.combined_credits?.cast,
        ...personInfo?.combined_credits?.crew,
      ]"
    ></KnowForPerson>
  </div>
</template>
<!-- TODO: Доделать адаптив! -->
<script>
import { mapState } from "vuex";
import PersonOverview from "@/components/homePage/PageType/Person/PersonOverview.vue";
import { getPersonInfo } from "@/api";
import Tabs from "@/components/UI/Tabs.vue";
import ImagesBlock from "@/components/homePage/PageType/ImagesBlock.vue";
import CreditPerson from "@/components/homePage/PageType/Person/CreditPerson.vue";
import KnowForPerson from "@/components/homePage/PageType/Person/KnowForPerson.vue";

export default {
  name: "PagePerson",
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
  data() {
    return {
      personInfo: {},
      currentTab: {
        title: "Known For",
        id: 0,
      },
      prevTab: {
        title: "Known For",
        id: 0,
      },
      tabList: [
        {
          title: "Known For",
          id: 0,
        },
        {
          title: "Credits",
          id: 1,
        },
        {
          title: "Photos",
          id: 2,
        },
      ],
      isLoading: false,
    };
  },
  methods: {
    setCurrentTab(currentTab) {
      this.prevTab = this.currentTab;
      this.currentTab = currentTab;
    },
  },
  async created() {
    try {
      this.personInfo = await getPersonInfo(this.$route.params.id);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(this.personInfo);
      this.isLoading = true;
    }
  },
  components: {
    PersonOverview,
    Tabs,
    ImagesBlock,
    CreditPerson,
    KnowForPerson,
  },
};
</script>

<style lang="scss" scoped>
.person {
  padding: 30px 30px 50px 50px;

  &__inner {
    display: flex;
    gap: 50px;
  }

  &__img {
    min-width: 300px;
    max-height: 450px;

    position: relative;
    img {
      width: 100%;
      position: relative;
      z-index: 1000;
      height: 100%;
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      width: 128px;
      height: 128px;
      transform: translate(-50%, -50%);
      background-image: url("../assets/empty-folder.png");
      background-repeat: no-repeat;
    }
  }
}
</style>