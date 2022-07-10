<template>
  <div class="tabs">
    <div
      ref="tabsItem"
      @click="$emit('setCurrentTab', tabsItem)"
      v-for="tabsItem in tabsList"
      :key="tabsItem"
      class="tabs__item"
      :data-index="tabsItem.id"
    >
      {{ tabsItem.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {};
  },
  props: {
    tabsList: Array,
    currentTab: Object,
  },
  emits: ["setCurrentTab"],
  mounted() {
    setTimeout(() => {
      this.$refs.tabsItem.forEach((tab) => {
        if (this.currentTab.id === +tab.getAttribute("data-index")) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
    }, 100);
  },
  watch: {
    currentTab(newCurrentTab) {
      this.$refs.tabsItem.forEach((tab) => {
        if (newCurrentTab.id === +tab.getAttribute("data-index")) {
          tab.classList.add("active");
        } else {
          tab.classList.remove("active");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.tabs {
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 50px;

  &__item {
    text-transform: uppercase;
    cursor: pointer;
    margin-top: 35px;
    font-weight: 700;
    font-size: 19px;
    color: #999;
    transition: all 0.15s;
    &:hover {
      color: $main-color;
    }
  }
}

.active {
  color: $main-color;
  &::after {
    animation: activeTab 0.2s ease-in;
    content: " ";
    display: block;
    width: 100%;
    height: 3px;
    margin-top: 5px;
    background-color: $main-color;
  }
}

@keyframes activeTab {
  0% {
    transform: translateX(-50px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>