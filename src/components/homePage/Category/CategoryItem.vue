<template>
  <div class="category__item">
    <div @click="getLink()" class="category__item-img">
      <img
        v-if="
          (categoryItem?.poster_path != null) | undefined ||
          (categoryItem?.profile_path != null) | undefined
        "
        class="lazyloading"
        :src="getImageURL"
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

    media: {
      type: String,
      default: "",
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.media === "tv") {
        if (this.categoryItem?.name.length > 23) {
          this.title = this.categoryItem?.name?.substring(0, 23) + "...";
        } else {
          this.title = this.categoryItem?.name;
        }
      } else if (this.media === "movie") {
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
      console.log(this.media);
      if (this.categoryItem?.gender === undefined) {
        this.$router.push(`/${this.media}/${this.categoryItem.id}`);
      } else {
        this.$router.push(`/person/${this.categoryItem.id}`);
      }
    },
  },
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
    getImageURL() {
      return this.media === "person" || this.categoryItem?.gender !== undefined
        ? `${this.IMAGE_URL}/w342${this.categoryItem.profile_path}`
        : `${this.IMAGE_URL}/w342${this.categoryItem?.poster_path}`;
    },
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
    max-height: 355px;

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
    height: 355px;
    width: 100%;

    img {
      height: 100%;

      transform: scale(1);
      position: absolute;
      z-index: 998;
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