<template functionality>
  <a @click="$router.go(-1)" class="back">Back</a>
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
  @media (max-width: 1024px) {
    display: block;
  }
  &--search {
    display: block;
    top: 35px !important;
    right: 20px;
    left: auto;
  }
  &--category {
    display: block;
    right: 0;
    left: auto;
    top: 35px !important;
    @media (max-width: 365px) {
      right: -15px;
    }
  }
  &--genre {
    display: block;
    right: 20px;
    top: 60px !important;
    left: auto;
  }
}
</style>