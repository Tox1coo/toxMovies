<template>
  <div class="person">
    <div class="person__inner">
      <img :src="`${IMAGE_URL}/w185${personInfo.profile_path}`" alt="" />
      <PersonOverview :person="personInfo"></PersonOverview>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PersonOverview from "@/components/homePage/PageType/Person/PersonOverview.vue";
export default {
  name: "PagePerson",
  computed: {
    ...mapState({
      personInfo: (state) => state.person.personInfo,
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
  methods: {
    ...mapActions({
      getPersonInfo: "person/getPersonInfo",
    }),
  },
  async created() {
    await this.getPersonInfo(this.$route.params.id);
  },
  components: { PersonOverview },
};
</script>

<style lang="scss" scoped>
</style>