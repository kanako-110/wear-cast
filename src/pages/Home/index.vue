<template>
  <header-toolbar />
  <div class="mt-8 d-flex justify-center">
    <weather-card
      :currentWeather="currentWeather"
      :todaysWeather="todaysWeather"
      :loaded="loadedWeather"
    />
  </div>
  <div class="mt-9">
    <!-- TODO; refetch when posted? -->
    <!-- TODO; add loading -->
    <wear-images :posts="outfitPosts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import WearImages from "@/pages/Home/components/WearImages.vue";
import HeaderToolbar from "@/pages/Home/components/header-toolbar.vue";
import { useOutfitPosts } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { useCurrentWeather } from "@/pages/Home/compositions/useCurrentWeather.ts";
import { useDailyWeatherWeather } from "@/pages/Home/compositions/useDailyWeatherForecast.ts";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
    WearImages,
    HeaderToolbar,
  },
  setup() {
    const { outfitPosts, fetchOutfitsPost } = useOutfitPosts();
    const {
      currentWeather,
      loaded: loadedCurrentWeather,
      getCurrentWeather,
    } = useCurrentWeather();

    const {
      todaysWeather,
      loaded: loadedDailyWeatherForecast,
      getDailyWeatherForecast,
    } = useDailyWeatherWeather();

    const loadedWeather = computed(
      () => loadedCurrentWeather.value && loadedDailyWeatherForecast.value
    );

    onMounted(() => {
      const CITY = "Vancouver";
      getCurrentWeather(CITY);
      getDailyWeatherForecast(CITY);
      fetchOutfitsPost();
    });

    return { outfitPosts, currentWeather, todaysWeather, loadedWeather };
  },
});
</script>
