<template functionality>
  <a @click="$router.go(-1)" class="back">Назад</a>
</template>

<script>
export default {
  name: "Back",
};
</script>

<style lang="scss" scoped>
.back {
  color: #999;
  font-size: 18px;
  position: absolute;
  z-index: 999;
  display: none;
  top: 20px;
  left: 20px;
  cursor: pointer;
  &::before {
    content: "";
    display: inline-block;
    width: 13px;
    height: 13px;
    border-left: 1px solid #999;
    border-top: 1px solid #999;
    margin-right: 5px;
    transform: rotate(310deg);
  }
  @media (max-width: 900px) {
    display: block;
  }
  &--search {
    right: 20px;
    top: 45px !important;
    left: 90% !important;
  }
  &--category {
    right: 20px;
    top: 35px !important;
    left: 88% !important;
  }
  &--genre {
    right: 20px;
    top: 60px !important;
    left: 90% !important;
  }
}
</style>