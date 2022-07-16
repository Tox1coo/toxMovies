<template>
  <div class="person__overview">
    <h2 class="title title--page">
      {{ getName }}
    </h2>
    <div class="person__overview-biography">
      <div v-html="formatContent(person?.biography)"></div>
      <ul class="person__overview-list">
        <li>
          <div>Know For:</div>
          <div>{{ person.known_for_department }}</div>
        </li>
        <li>
          <div>Born:</div>
          <div>{{ person.birthday }} (age {{ getAge }})</div>
        </li>
        <li v-if="person?.deathday !== null">
          <div>Died:</div>
          <div>{{ person.deathday }} (age {{ getAge }})</div>
        </li>
        <li>
          <div>Place of born:</div>
          <div>{{ person.place_of_birth }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true,
    },
  },

  computed: {
    getName() {
      return this.person?.name;
    },
    getAge() {
      return this.person?.deathday == null
        ? new Date().getFullYear() -
            new Date(this.person?.deathday).getFullYear()
        : new Date(this.person?.deathday).getFullYear() -
            new Date(this.person?.deathday).getFullYear();
    },
  },
  methods: {
    formatContent(string) {
      return string
        ?.split("\n\n")
        ?.filter((section) => section !== "")
        ?.map((section) => `<p class="text text--biography">${section}</p>`)
        ?.join("");
    },
  },
};
</script>

<style lang="scss" scoped>
.person__overview {
  &-biography {
    width: 70%;
  }

  &-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-wrap: wrap;
    li {
      display: flex;
      div {
        &:first-child {
          min-width: 150px;
        }
      }
    }
  }
}
</style>