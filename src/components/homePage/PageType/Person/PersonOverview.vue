<template>
  <div class="person__overview">
    <h2 class="title title--image">
      {{ getName }}
    </h2>
    <div class="person__overview-biography">
      <div v-html="formatContent(person?.biography)"></div>
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
  },
  methods: {
    formatContent(string) {
      return string
        ?.split("\n")
        ?.filter((section) => section !== "")
        ?.map((section) => `<p class="text text--biography">${section}</p>`)
        ?.join("");
    },
  },
};
</script>

<style>
</style>