<template>
  <footer class="footer">
    <div class="footer__inner">
      <p>© 2022 Tox1coo Movie app.</p>
      <p>
        Спроектировано и сделано мной, база представлена
        <a href="https://www.themoviedb.org">TMBD</a>
      </p>
      <div class="footer__inner-social">
        <a href="https://github.com/Tox1coo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29px"
            height="29px"
            viewBox="0 0 24 24"
            fill="#999"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2.218 18.616c-.354.069-.468-.149-.468-.336v-1.921c0-.653-.229-1.079-.481-1.296 1.56-.173 3.198-.765 3.198-3.454 0-.765-.273-1.389-.721-1.879.072-.177.312-.889-.069-1.853 0 0-.587-.188-1.923.717-.561-.154-1.159-.231-1.754-.234-.595.003-1.193.08-1.753.235-1.337-.905-1.925-.717-1.925-.717-.379.964-.14 1.676-.067 1.852-.448.49-.722 1.114-.722 1.879 0 2.682 1.634 3.282 3.189 3.459-.2.175-.381.483-.444.936-.4.179-1.413.488-2.037-.582 0 0-.37-.672-1.073-.722 0 0-.683-.009-.048.426 0 0 .46.215.777 1.024 0 0 .405 1.25 2.353.826v1.303c0 .185-.113.402-.462.337-2.782-.925-4.788-3.549-4.788-6.641 0-3.867 3.135-7 7-7s7 3.133 7 7c0 3.091-2.003 5.715-4.782 6.641z"
            />
          </svg>
        </a>
        <a href="https://vk.com/rusbatka1">
          <svg
            fill="#999"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="35px"
            height="35px"
          >
            <path
              d="M48,7H16c-4.418,0-8,3.582-8,8v32c0,4.418,3.582,8,8,8h32c4.418,0,8-3.582,8-8V15C56,10.582,52.418,7,48,7z M42.323,42 c-1.219-3.804-4.257-6.747-8.275-7.147V42h-0.62C22.496,42,16.26,34.492,16,22h5.477c0.18,9.169,4.217,13.053,7.415,13.854V22 h5.157v7.908c3.158-0.34,6.476-3.944,7.595-7.908h5.157c-0.859,4.885-4.457,8.488-7.016,9.97C42.343,33.171,46.441,36.314,48,42 H42.323z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  padding-top: 50px;
  margin-left: 50px;
  font-size: 14px;
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  align-items: flex-end;
  color: #999;
  a {
    color: #858585;
  }
  p {
    margin-bottom: 5px;
  }
  &__inner-social {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 10px;
    padding-bottom: 15px;
    a {
      &:hover svg {
        fill: #c8c8c8;
      }
    }
  }
  @media (max-width: 900px) {
    margin-left: 10px;
  }
}
svg {
  transition: all 0.1s ease 0s;
}
</style>