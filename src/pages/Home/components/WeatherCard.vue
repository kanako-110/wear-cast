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
            <img
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
              alt="fashion image"
              aspect-ratio="16/9"
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2124&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useCurrentWeather } from "@/pages/Home/compositions/useCurrentWeather.ts";
import { useDailyWeatherWeather } from "@/pages/Home/compositions/useDailyWeatherForecast.ts";

export default defineComponent({
  name: "WeatherCard",
  props: {
    currentWeather: {
      // TODO: type
      type: Object,
      required: true,
    },
    todaysWeather: {
      // TODO: type
      type: Object,
      required: true,
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
          `https://www.weatherbit.io/static/img/icons/${props.todaysWeather.weather.icon}.png` ||
          "",
        description: props.todaysWeather.weather.description,
      };
    });

    return { weatherIcon };
  },
});
</script>
