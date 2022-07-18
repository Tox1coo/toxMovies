<template>
  <div v-if="isLoading" class="person">
    <Back></Back>
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
  <Loading class="loading__home" v-else></Loading>
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
      isLoading: false,
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
  @media (max-width: 500px) {
    padding: 30px 10px 30px 10px;
  }
  &__inner {
    display: flex;
    gap: 50px;
    @media (max-width: 900px) {
      flex-direction: column;
      gap: 30px;
      align-items: center;
    }
  }

  &__img {
    max-width: 300px;
    min-height: 350px;

    max-height: 450px;

    position: relative;
    img {
      position: relative;
      z-index: 1000;
      height: 100%;
      @media (max-width: 900px) {
        width: 100%;

        max-width: 350px;
        max-height: 350px;
      }
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