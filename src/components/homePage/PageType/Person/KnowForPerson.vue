<template functionality>
  <div v-if="knowforPerson.length > 0" class="knowfor">
    <div class="knowfor__inner">
      <CategoryItem
        v-for="knowforPersonItem in knowforPerson"
        :key="knowforPersonItem"
        :categoryItem="knowforPersonItem"
        :media="knowforPersonItem.media_type"
      ></CategoryItem>
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/homePage/Category/CategoryItem.vue";
export default {
  props: {
    knowforPerson: {
      type: Array,
      required: true,
    },
  },

  components: { CategoryItem },
};
</script>
<style lang="scss" scoped>
.knowfor {
  padding: 30px 30px 30px 0;

  &__inner {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    @media (max-width: 1400px) {
      justify-content: center;
    }
  }
  @media (max-width: 500px) {
    padding: 30px 0px 30px 0;
  }
}
</style>