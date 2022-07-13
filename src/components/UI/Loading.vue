<template>
  <div class="loading">
    <div class="loading__inner">
      <div class="loading__item"></div>
      <div class="loading__item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
.loading {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 40%;
  width: 200px;
  height: 200px;
  &__inner {
    width: 100%;
    height: 100%;
    position: relative;
  }
  &__item {
    right: 0;
    position: absolute;

    &:first-child {
      top: 14px;
      left: 150px;
      animation: loading-first 3s cubic-bezier(0.14, 0.47, 0.2, 1.15) infinite;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      border: 1px solid #0000ff;
    }
    &:last-child {
      animation: loading-last 1.5s cubic-bezier(0.14, 0.47, 0.2, 1.15) infinite;
      position: absolute;
      width: 65px;
      height: 65px;

      border-radius: 50%;
      border: 1px solid #0000ff;
    }
  }
}
@keyframes loading-first {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }

  50% {
    transform: scale(1.5);
    opacity: 1;
  }

  100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
}
@keyframes loading-last {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(0.1);
    opacity: 0.5;
  }
}
</style>