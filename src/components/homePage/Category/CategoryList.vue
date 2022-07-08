<template>
  <div class="category">
    <div class="category__link">
      <h2>
        {{ typeCategory }}
        <span v-if="mediaTypeList[0]?.media_type === 'movie'"> Movie</span>
        <span v-else>TV Shows</span> of week
      </h2>
      <a
        @click="
          $router.push(
            `${
              mediaTypeList[0].media_type
            }/category/${typeCategory.toLowerCase()}`
          )
        "
        >Показать все</a
      >
    </div>
    <div class="category__inner">
      <CategoryItem
        v-for="categoryItem in mediaTypeList"
        :key="categoryItem.id"
        :categoryItem="categoryItem"
      ></CategoryItem>
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/homePage/Category/CategoryItem.vue";
export default {
  data() {
    return {};
  },
  props: {
    mediaTypeList: Array,
    typeCategory: String,
  },
  components: { CategoryItem },
};
</script>

<style lang="scss" scoped>
.category {
  padding-left: 50px;
  &__inner {
    display: flex;
    gap: 20px;
  }
  &__link {
    display: flex;
    align-items: flex-end;
    margin-bottom: 25px;
    gap: 7px;
    a {
      margin-bottom: 2px;
      color: #1d95dc;
      cursor: pointer;
      transition: color 0.1s ease 0s;
      &:hover {
        color: #5b68ff;
      }
    }
  }
}
</style>