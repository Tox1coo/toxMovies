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
    prevId: Object,
  },
  emits: ["setCurrentTab"],
  mounted() {
    setTimeout(() => {
      this.$refs.tabsItem.forEach((tab) => {
        if (this.currentTab.id === +tab.getAttribute("data-index")) {
          if (+tab.getAttribute("data-index") < this.prevId.id) {
            tab.classList.add("active--anim");
          } else {
            tab.classList.add("active");
          }
        } else {
          if (+tab.getAttribute("data-index") < this.prevId.id) {
            tab.classList.remove("active--anim");
          } else {
            tab.classList.remove("active--anim");
            tab.classList.remove("active");
          }
        }
      });
    }, 500);
  },
  watch: {
    currentTab(newCurrentTab) {
      this.$refs.tabsItem.forEach((tab) => {
        if (newCurrentTab.id === +tab.getAttribute("data-index")) {
          if (this.currentTab.id < this.prevId.id) {
            tab.classList.add("active--anim");
          } else {
            if (tab.classList.contains("active")) return;
            tab.classList.add("active");
          }
        } else {
          if (+tab.getAttribute("data-index") < this.prevId.id) {
            tab.classList.remove("active--anim");
          } else {
            console.log(tab);
            tab.classList.remove("active--anim");
            tab.classList.remove("active");
          }
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
  @media (max-width: 520px) {
    & &__item {
      font-size: 17px;
    }
  }
  @media (max-width: 520px) {
    gap: 20px;
  }
  @media (max-width: 375px) {
    & &__item {
      font-size: 15px;
      margin-top: 15px;
    }
    gap: 10px;
    flex-wrap: wrap;
  }
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
    animation: activeTab 0.2s ease-in-out;
    content: " ";
    display: block;
    width: 100%;
    height: 3px;
    margin-top: 5px;
    background-color: $main-color;
  }
  &--anim {
    color: $main-color;

    &::after {
      animation: prevActiveTab 0.2s ease-in-out;
      content: " ";
      display: block;
      width: 100%;
      height: 3px;
      margin-top: 5px;
      background-color: $main-color;
    }
  }
}

@keyframes activeTab {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes prevActiveTab {
  0% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>