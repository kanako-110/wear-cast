<template>
  <!-- TODO: loading UI -->
  <template v-if="!loaded"> loading... </template>
  <template v-else>
    <v-card
      :title="currentWeather.city_name"
      :subtitle="todaysWeather.datetime"
      width="60%"
    >
      <!-- TODO; style -->
      <v-card-text>
        <v-row align="center">
          <v-col class="text-center" cols="4">
            <v-img
              width="80%"
              :src="weatherIcon.url"
              :alt="weatherIcon.description"
            />
            <p class="text-h5 mt-4">{{ currentWeather.temp }}&deg;C</p>
          </v-col>
          <v-col class="text-center" cols="4">
            <div class="temperature-wrapper d-flex justify-center">
              <div>
                <p class="text-body-1 mb-1">
                  H: {{ todaysWeather.max_temp }}&deg;C
                </p>
              </div>
              <div class="ml-3">
                <p class="text-body-1 mb-1">
                  L: {{ todaysWeather.min_temp }} &deg;C
                </p>
              </div>
            </div>
            <p class="mt-4">
              <v-icon
                aria-label="percentage of precipitation"
                icon="mdi-umbrella-outline"
                width="24"
              />
              <span class="text-body-2"> {{ todaysWeather.pop }}% </span>
            </p>
          </v-col>
          <v-col class="text-center" cols="4">
            <v-img
              alt="most liked outfit of today"
              aspect-ratio="16/9"
              :src="mostLikedOutfit.imageUrl"
              :lazy-src="placeholderImage"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import type { TodaysWeather } from "@/pages/Home/compositions/useDailyWeatherForecast.ts";
import type { CurrentWeather } from "@/pages/Home/compositions/useCurrentWeather.ts";
import { OutfitData } from "@/pages/Home/compositions/useOutfitPosts.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";

export default defineComponent({
  name: "WeatherCard",
  props: {
    todaysWeather: {
      type: Object as PropType<TodaysWeather>,
      required: true,
    },
    currentWeather: {
      type: Object as PropType<CurrentWeather>,
      required: true,
    },
    mostLikedOutfit: {
      type: Object as PropType<OutfitData>,
      default: {},
    },
    loaded: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const weatherIcon = computed(() => {
      return {
        url:
          `https://www.weatherbit.io/static/img/icons/${props.todaysWeather.weather?.icon}.png` ||
          "",
        description: props.todaysWeather.weather?.description,
      };
    });

    return { weatherIcon, placeholderImage };
  },
});
</script>
