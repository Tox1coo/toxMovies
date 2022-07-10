<template>
  <div class="category__item">
    <div
      @click="$router.push(`/${categoryItem.media_type}/${categoryItem.id}`)"
      class="category__item-img"
    >
      <img
        class="lazyloading"
        :src="`${IMAGE_URL}/w342/${categoryItem?.poster_path}`"
        alt=""
      />
    </div>
    <div class="category__item-body">
      <h3 class="title title--slider">
        {{ title }}
      </h3>
      <Star
        v-if="
          categoryItem?.vote_average != 0 &&
          categoryItem?.vote_average != undefined
        "
        :vote_average="categoryItem?.vote_average"
        :vote_count="categoryItem?.vote_count"
      ></Star>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
    };
  },
  props: {
    categoryItem: {
      type: Object,
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.categoryItem?.media_type === "tv") {
        if (this.categoryItem?.name.length > 23) {
          this.title = this.categoryItem?.name?.substring(0, 23) + "...";
        } else {
          this.title = this.categoryItem?.name;
        }
      } else {
        if (this.categoryItem?.title.length > 23) {
          this.title = this.categoryItem?.title?.substring(0, 23) + "...";
        } else {
          this.title = this.categoryItem?.title;
        }
      }
    }, 700);
  },
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
};
</script>

<style lang="scss" scoped>
.category__item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s ease 0s;
  min-height: 450px;

  &-img {
    background-color: #202124;
    cursor: pointer;
    min-width: 215px;
    max-width: 215px;

    min-height: 355px;
    max-height: 355px;
    img {
      min-height: 355px;
      max-height: 355px;
      transform: scale(1);

      transition: all 0.2s ease 0s;

      width: 100%;
    }
    &:hover {
      & img {
        transform: scale(1.05);
        border-radius: 25px;
      }
    }
  }
  &-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }
}
</style>