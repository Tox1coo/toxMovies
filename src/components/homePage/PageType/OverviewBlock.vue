<template>
  <div class="overview">
    <div class="overview__inner">
      <div class="overview__inner-top overview__top">
        <div class="overview__top-poster">
          <img
            v-if="overviewItem.poster_path != null"
            :src="`${IMAGE_URL}/w342/${overviewItem.poster_path}`"
            alt=""
          />
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
                <div v-if="this.overviewItem?.release_date != ''">
                  {{ new Date(this.overviewItem.release_date).getDate() }}
                  {{
                    arrMonth[
                      new Date(this.overviewItem.release_date).getUTCMonth()
                    ]
                  }}
                  {{ new Date(this.overviewItem.release_date).getFullYear() }}
                </div>
                <div v-else>Неизвестно</div>
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
                  <a
                    @click="$router.push(`/person/${director[0]?.id}`)"
                    class="overview__link"
                    >{{ director[0]?.name }}</a
                  >
                </div>
              </li>
              <li v-if="this.$route.params.media === 'tv'">
                <div>Creator:</div>
                <div v-if="overviewItem?.created_by[0]?.name != undefined">
                  <a
                    @click="
                      $router.push(`/person/${overviewItem?.created_by[0]?.id}`)
                    "
                    class="overview__link"
                    clas="overview__link"
                    >{{ overviewItem?.created_by[0]?.name }}</a
                  >
                </div>
                <div v-else>—</div>
              </li>
              <li>
                <div>Budget:</div>
                <div
                  v-if="
                    overviewItem?.budget != undefined &&
                    overviewItem.budget != 0
                  "
                >
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
                <div
                  v-if="
                    overviewItem?.revenue != undefined &&
                    overviewItem.revenue != 0
                  "
                >
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
                    @click="
                      $router.push(`/genre/${genre.id}/${$route.params.media}`)
                    "
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
                <div
                  v-if="
                    overviewItem?.production_companies?.length > 0 ||
                    overviewItem?.production_companies != undefined
                  "
                >
                  <span
                    class="list-link"
                    v-for="comp in overviewItem?.production_companies"
                    :key="comp.id"
                    >{{ comp.name }}</span
                  >
                </div>
                <div v-else>—</div>
              </li>
              <li>
                <div>Production Countries:</div>
                <div
                  v-if="
                    overviewItem?.production_countries?.length > 0 ||
                    overviewItem?.production_countries != undefined
                  "
                >
                  <span
                    class="list-link"
                    v-for="country in overviewItem?.production_countries"
                    :key="country.id"
                    >{{ country.name }}</span
                  >
                </div>
                <div v-else>—</div>
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
          :title="'Cast'"
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
      min-width: 290px;
      border: 1px solid rgba(#999, 0.2);
      animation: anim-poster 2s cubic-bezier(0.14, 0.47, 0.2, 1.15);
      position: relative;
      img {
        width: 100%;
        position: relative;
        z-index: 3;
      }
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        top: 50%;
        left: 50%;
        z-index: 2;
        transform: translate(-50%, -50%);
        background-image: url("../../../assets/error.png");
        background-repeat: no-repeat;
      }
      @media (max-width: 850px) {
        max-width: 500px;
        margin-bottom: 15px;
      }
    }
    @media (max-width: 850px) {
      margin-bottom: 15px;
      align-items: center;

      flex-direction: column;
    }
    @media (max-width: 650px) {
      align-items: center;
    }
    @media (max-width: 400px) {
      padding: 30px 10px 50px 10px;
    }
    @media (max-width: 465px) {
      padding: 30px 10px 20px 10px;
    }
  }
  &__link {
    text-decoration: underline;
    color: #11acff;
    cursor: pointer;
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
  @media (max-width: 650px) {
    margin-left: 0;
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
  @media (max-width: 510px) {
    font-size: 15px;
  }
  li {
    display: flex;
    div:first-child {
      max-width: fit-content;
      min-width: 180px;
      @media (max-width: 425px) {
        max-width: 100px;

        min-width: 100px;
      }
      @media (max-width: 340px) {
        max-width: 80px;
        min-width: 80px;
      }
    }
    div:last-child {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
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