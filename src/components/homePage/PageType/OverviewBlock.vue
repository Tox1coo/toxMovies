<template>
  <div class="overview">
    <div class="overview__inner">
      {{ overviewItem }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: {},
    };
  },
  props: {
    overviewItem: Object,
  },
  mounted() {},
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>