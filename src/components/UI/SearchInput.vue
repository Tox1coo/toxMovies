<template>
  <transition name="search">
    <div
      v-if="showSearch"
      @click.stop="updateShowSearch(false)"
      class="search__modal"
    >
      <div @click.stop class="search__modal-inner">
        <input
          v-focus
          class="search__modal-input"
          type="text"
          placeholder="Search for Movies, TV Shows and Person"
          @input="$emit('search', $event.target.value)"
        />
        <span @click="updateShowSearch(false)" class="close"></span>
      </div>
    </div>
  </transition>
</template>

<script>
import toggleMixins from "@/mixins/toggleMixins";
import { mapMutations, mapState } from "vuex";
export default {
  name: "SearchInput",
  mixins: [toggleMixins],
  computed: {
    ...mapState({
      showSearch: (state) => state.search.showSearch,
    }),
  },

  methods: {
    ...mapMutations({
      updateShowSearch: "search/updateShowSearch",
    }),
  },
};
</script>

<style lang="scss" scoped>
.search__modal {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 1000;
  display: flex;
  height: 60px;
  cursor: pointer;
  &-inner {
    width: calc(100% - 120px);
    margin-left: 120px;
    position: relative;
    height: 60px;
    @media (max-width: 1200px) {
      width: 100%;
      margin-left: 0;
      height: 80px;
      & input {
        font-size: 18px;
      }
    }
  }
  &-input {
    border: none;
    background-color: #202124;
    color: #fff;
    width: 100%;
    height: 100%;
    padding: 10px 10px 10px 15px;
    &:focus {
      outline: none;
      box-shadow: 0px 24px 26px 7px rgba(76, 77, 79, 0.5);
    }
  }
}
.close {
  position: absolute;
  z-index: 100;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  height: 24px;
  width: 24px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    height: 2px;
    background-color: #fff;
    transform: rotate(-45deg);
  }
  &::before {
    content: "";
    display: block;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    width: 18px;
    height: 2px;
    background-color: #fff;
    transform: rotate(45deg);
  }
}

.search-enter-active {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 0.7s ease 0s;
}
.search-leave-active {
  transition: all 0.5s ease 0s;
}
.search-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.search-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
</style>