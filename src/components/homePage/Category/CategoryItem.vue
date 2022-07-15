<template>
  <div class="category__item">
    <div @click="getLink()" class="category__item-img">
      <img
        v-if="
          this.categoryItem?.media_type != undefined ||
          this.categoryItem?.gender === undefined
        "
        class="lazyloading"
        :src="`${IMAGE_URL}/w342/${categoryItem?.poster_path}`"
        alt=""
      /><img
        v-else
        class="lazyloading"
        :src="`${IMAGE_URL}/w342/${categoryItem?.profile_path}`"
        alt=""
      />
    </div>
    <div class="category__item-body">
      <h3 class="title title--slider">
        {{ title }}
      </h3>
      <h2
        class="subtitle subtitle--slider"
        v-if="this.categoryItem?.media_type == undefined"
      >
        {{ subtitle }}
      </h2>
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
      subtitle: "",
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
      } else if (this.categoryItem?.media_type === "movie") {
        if (this.categoryItem?.title?.length > 23) {
          this.title = this.categoryItem?.title?.substring(0, 23) + "...";
        } else {
          this.title = this.categoryItem?.title;
        }
      } else {
        if (this.categoryItem?.title != undefined) {
          this.title = this.categoryItem?.title;
          return;
        }
        this.title = this.categoryItem?.name;
        this.subtitle = this.categoryItem?.character;
      }
    }, 700);
  },
  methods: {
    getLink() {
      if (this.categoryItem?.gender === undefined) {
        this.$router.push(
          `/${this.categoryItem?.media_type || this.$route.params.media}/${
            this.categoryItem.id
          }`
        );
      } else {
        this.$router.push(`/person/${this.categoryItem.id}`);
      }
    },
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
  overflow: hidden;
  &-img {
    background-color: #202124;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      display: block;
      top: 50%;
      height: 64px;
      width: 64px;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      background-image: url("../../../assets/error.png");
    }
    cursor: pointer;
    min-width: 215px;
    max-width: 215px;

    min-height: 355px;
    max-height: 355px;
    img {
      min-height: 355px;
      max-height: 355px;
      transform: scale(1);
      position: relative;
      z-index: 1000;
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
    gap: 15px;
    align-items: flex-start;
  }
}
</style>