<template>
  <div class="person__credits">
    <DropList v-model:sortedItem="sortedItem" :list="typeList"></DropList>

    <DropList v-model:sortedItem="sortedItemMedia" :list="typeMedia"></DropList>

    <div class="person__credits-list">
      <h3>Sorted for: {{ sortedItem }}</h3>
      <div
        v-for="(creditsItem, index) in getListCredits"
        :key="`${creditsItem.id}${creditsItem.vote_count}${index}`"
        class="person__credits-item credits"
        :class="{
          credits__crew: creditsItem?.department !== undefined,
          credits__cast: creditsItem?.department === undefined,
        }"
      >
        <div class="credits__year">
          <div
            v-if="
              (creditsItem?.release_date !== '' &&
                creditsItem?.release_date !== undefined) ||
              (creditsItem?.first_air_date !== undefined &&
                creditsItem.first_air_date !== '')
            "
          >
            {{
              new Date(creditsItem.release_date).getFullYear() ||
              new Date(creditsItem.first_air_date).getFullYear()
            }}
          </div>

          <div v-else>—</div>
        </div>
        <div class="credits__info">
          <a
            @click="
              $router.push(`/${creditsItem.media_type}/${creditsItem.id}`)
            "
            class="credits__link"
            >{{ creditsItem.name || creditsItem.title }}</a
          >
          <span>
            as {{ creditsItem.character || creditsItem.department }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api";
export default {
  props: {
    personCredits: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      typeList: ["Acting"],
      typeMedia: ["TV Shows", "Movies"],
      listCredits: [],
      sortedItem: "All",
      sortedItemMedia: "All",
    };
  },
  computed: {
    getListCredits() {
      return getList(this.sortedItem, this.sortedItemMedia, [
        ...this.personCredits.crew,
        ...this.personCredits.cast,
      ]);
    },
  },

  async mounted() {
    this.personCredits.crew.forEach((type) => {
      if (!this.typeList.includes(type.department)) {
        this.typeList.push(type.department);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.person__credits {
  margin-top: 25px;
  &-list {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}

.credits {
  height: 45px;
  border-radius: 8px;
  display: flex;
  gap: 50px;
  align-items: center;
  &__year {
    min-width: 70px;
    padding-left: 15px;
  }
  &__info {
    display: flex;
    align-items: center;
    gap: 10px;
    span {
      color: rgba(#fff, 0.8);
    }
  }
  &__link {
    font-size: 18px;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    transition: color 0.2s ease 0s;
    &::after {
      content: "";
      transition: background-color 0.2s ease 0s;

      display: block;
      width: 100%;
      height: 1px;
      background-color: #fff;
    }
    &:hover {
      color: rgba(#fff, 0.8);
      &.credits__link::after {
        background-color: rgba(#fff, 0.8);
      }
    }
  }
  &__crew {
    background-color: #202124;
  }

  &__cast {
    background-color: #363636;
  }
}
</style>