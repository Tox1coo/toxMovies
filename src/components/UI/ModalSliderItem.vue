<template>
  <iframe
    width="100%"
    height="100%"
    :src="`https://www.youtube.com/embed/${trailerKey}`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  name: "ModalSliderItem",
  props: {
    trailerKey: String,
  },
};
</script>

<style lang="scss" scoped>
iframe {
  max-width: 100%;
}
</style>