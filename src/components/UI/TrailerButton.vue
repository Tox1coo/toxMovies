<template>
  <button @click="isShowTrailer(true)" class="btn__trailer">
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        fill="#fff"
        clip-rule="evenodd"
        d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM10 8.8C10 8.50496 10.1522 8.23388 10.3961 8.09466C10.64 7.95545 10.9359 7.9707 11.166 8.13436L15.666 11.3344C15.8747 11.4827 16 11.7325 16 12C16 12.2675 15.8747 12.5173 15.666 12.6656L11.166 15.8656C10.9359 16.0293 10.64 16.0446 10.3961 15.9053C10.1522 15.7661 10 15.495 10 15.2V8.8Z"
      />
    </svg>
    Смотреть трейлер
  </button>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "TrailerButton",
  methods: {
    ...mapMutations({
      isShowTrailer: "movies/isShowTrailer",
    }),
  },
};
</script>

<style lang="scss" scoped>
.btn__trailer {
  background-color: #202124;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $main-color;
  gap: 10px;
  margin-top: 35px;
  padding: 15px 25px;
  font-size: 15px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease 0s;
  &:hover {
    & svg path {
      fill: rgba(#ff0700, 0.5);
    }
    background-color: #2f2f2f;
  }
}
path {
  transition: fill 0.2s ease 0s;
}
</style>