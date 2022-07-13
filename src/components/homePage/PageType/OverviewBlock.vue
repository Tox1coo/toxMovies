<template>
  <div class="overview">
    <div class="overview__inner">
      <div class="overview__inner-top overview__top">
        <div class="overview__top-poster">
          <img :src="`${IMAGE_URL}/w342/${overviewItem.poster_path}`" alt="" />
        </div>
        <div class="overview__top-info info">
          <div v-if="this.$route.params.media === 'movie'" class="info__title">
            <h2 class="title title--page">{{ overviewItem.title }}</h2>
            <h3 class="subtitle">{{ overviewItem.original_title }}</h3>
          </div>
          <div v-else class="info__title">
            <h2 class="title title--page">{{ overviewItem.name }}</h2>
            <h3 class="subtitle">{{ overviewItem.original_name }}</h3>
          </div>
          <div class="info__list">
            <ul>
              <li v-if="this.$route.params.media === 'movie'">
                <div>Released:</div>
                <div>
                  {{ new Date(this.overviewItem.release_date).getDate() }}
                  {{
                    arrMonth[
                      new Date(this.overviewItem.release_date).getUTCMonth()
                    ]
                  }}
                  {{ new Date(this.overviewItem.release_date).getFullYear() }}
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>First Aired:</div>
                <div>
                  {{ new Date(this.overviewItem.first_air_date).getDate() }}
                  {{
                    arrMonth[
                      new Date(this.overviewItem.first_air_date).getUTCMonth()
                    ]
                  }}
                  {{ new Date(this.overviewItem.first_air_date).getFullYear() }}
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>Last Aired:</div>
                <div>
                  {{ new Date(this.overviewItem.last_air_date).getDate() }}
                  {{
                    arrMonth[
                      new Date(this.overviewItem.last_air_date).getUTCMonth()
                    ]
                  }}
                  {{ new Date(this.overviewItem.last_air_date).getFullYear() }}
                </div>
              </li>
              <li>
                <div>Runtime:</div>
                <div v-if="this.$route.params.media === 'movie'">
                  {{ overviewItem?.runtime }} min
                </div>
                <div v-else>{{ overviewItem?.episode_run_time[0] }} min</div>
              </li>
              <li v-if="this.$route.params.media === 'movie'">
                <div>Director:</div>
                <div>
                  <a href>{{ director[0]?.name }}</a>
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>Creator:</div>
                <div>
                  <a class="overview__link" href>{{
                    overviewItem?.created_by[0]?.name
                  }}</a>
                </div>
              </li>
              <li>
                <div>Budget:</div>
                <div v-if="overviewItem?.budget != undefined">
                  {{
                    overviewItem?.budget
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }}
                  $
                </div>
                <div v-else>—</div>
              </li>
              <li>
                <div>Revenue:</div>
                <div v-if="overviewItem?.revenue != undefined">
                  {{
                    overviewItem?.revenue
                      ?.toString()
                      ?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }}
                  $
                </div>
                <div v-else>—</div>
              </li>
              <li>
                <div>Genre:</div>
                <div>
                  <a
                    class="overview__link list-link"
                    v-for="genre in overviewItem?.genres"
                    :key="genre.id"
                    >{{ genre.name }}</a
                  >
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>Seasons:</div>
                <div>
                  {{ overviewItem?.number_of_seasons }}
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>Episodes:</div>
                <div>
                  {{ overviewItem?.number_of_episodes }}
                </div>
              </li>
              <li>
                <div>Status:</div>
                <div>
                  {{ overviewItem?.status }}
                </div>
              </li>
              <li>
                <div>Language:</div>
                <div>
                  {{ overviewItem?.original_language?.toUpperCase() }}
                </div>
              </li>
              <li v-if="this.$route.params.media === 'movie'">
                <div>Production:</div>
                <div>
                  <span
                    class="list-link"
                    v-for="country in overviewItem?.production_companies"
                    :key="country.id"
                    >{{ country.name }}</span
                  >
                </div>
              </li>
              <li>
                <div>Production Countries:</div>
                <div>
                  <span
                    class="list-link"
                    v-for="country in overviewItem?.production_countries"
                    :key="country.id"
                    >{{ country.name }}</span
                  >
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>Network:</div>
                <div>
                  {{ overviewItem?.networks[0].name }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="overwiew__inner-bottom overwiew__bottom">
        <CategoryList
          :mediaTypeList="castList"
          :showIsAll="false"
          :typeCategory="'Cast'"
        ></CategoryList>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CategoryList from "../Category/CategoryList.vue";
export default {
  data() {
    return {
      overviewInfo: {},
      arrMonth: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  props: {
    overviewItem: {
      type: Object,
      default: () => {},
    },
    castList: {
      type: Array,
      default: () => [],
    },
    director: {
      type: [Array, Object],
      default: () => [],
    },
  },
  mounted() {
    console.log(this.$route);
  },
  computed: {
    ...mapState({
      IMAGE_URL: (state) => state.movies.IMAGE_URL,
    }),
  },
  components: { CategoryList },
};
</script>

<style lang="scss" scoped>
.overview {
  &__top {
    display: flex;
    padding: 50px;
    padding-top: 30px;
    &-poster {
      animation: anim-poster 2s cubic-bezier(0.14, 0.47, 0.2, 1.15);
    }
  }
  margin-bottom: 25px;
}
.info {
  margin-left: 50px;
  &__title {
    animation: anim-title 1s ease;
  }
  &__list {
    animation: anim-list 2s cubic-bezier(0.14, 0.47, 0.2, 1.15);
  }
}
.list-link {
  margin-right: 5px;
  &::after {
    content: ",";
    display: inline-block;
    color: $main-color;
  }
  &:last-child::after {
    content: "";
  }
}

ul {
  margin-top: 25px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 18px;
  li {
    display: flex;
    div:first-child {
      max-width: fit-content;
      min-width: 180px;
    }
  }
}

@keyframes anim-title {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

@keyframes anim-list {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}

@keyframes anim-poster {
  0% {
    transform: translateX(-100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>