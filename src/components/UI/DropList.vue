<template>
  <select @change="setSearchList($event)" ref="drop" class="drop">
    <option value="All">All</option>
    <option
      class="drop__item"
      v-for="(type, index) in listTypeVideos"
      :value="type"
      :key="index"
    >
      {{ type }}
    </option>
  </select>
</template>

<script>
/* eslint-disable prettier/prettier */

export default {
  name: "DropList",
  data() {
    return {
      listTypeVideos: [],
    };
  },

  props: {
    list: {
      type: Array,
      required: false,
    },
    visibleDropList: Boolean,
    sortedItem: {
      type: String,
      default: "All",
    },
  },

  methods: {
    setSearchList(element) {
      this.$emit("update:sortedItem", element.target.value);
    },
  },
  mounted() {
    if (this.list[0]?.type != undefined) {
      this.list.forEach((video) => {
        if (!this.listTypeVideos.includes(video.type)) {
          this.listTypeVideos.push(video.type);
        }
      });
    } else {
      this.listTypeVideos = this.list;
    }
  },
};
</script>

<style lang="scss" scoped>
.drop {
  margin-right: 10px;
  width: 230px;
  height: fit-content;
  min-height: 30px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-left: 2px;
  background-color: rgba(transparent, 0.1);
  backdrop-filter: blur(5px);
  color: #ccc;
  &__item {
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    margin: 0;
  }
}

option {
  background-color: $main-bgcolor;
}
</style>
