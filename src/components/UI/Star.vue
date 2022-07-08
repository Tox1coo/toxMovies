<template>
  <div class="star">
    <div class="star__body">
      <div ref="rating__active" class="star__active"></div>
      <div class="star__rating">
        {{ vote_average }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Star",
  props: {
    vote_count: Number,
    vote_average: Number,
  },
  async mounted() {
    setTimeout(() => {
      this.initialRating();
    }, 700);
  },
  methods: {
    initialRating() {
      console.log(this.vote_average / 0.32);
      this.$refs.rating__active.style.width = `${this.vote_average / 0.32}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.star {
  font-size: 17px;
  margin-top: 15px;
  margin-bottom: 15px;

  color: #999;
  &__body {
    position: relative;
    display: flex;
    align-items: flex-end;
    &::before {
      content: "★★★★★";
      display: block;
    }
  }
  &__active {
    position: absolute;
    width: 40%;
    height: 100%;

    top: 0;
    left: 0;
    overflow: hidden;
    &::before {
      content: "★★★★★";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      color: $star-color;
    }
  }
  &__rating {
    padding-left: 5px;
    padding-right: 15px;
  }
}
</style>
