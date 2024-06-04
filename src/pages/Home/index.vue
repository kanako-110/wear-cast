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
    <outfit-images :posts="outfitPosts" :loaded="loadedOutfitPosts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import OutfitImages from "@/pages/Home/components/OutfitImages.vue";
import HeaderToolbar from "@/pages/Home/components/HeaderToolbar.vue";
import { useOutfitPosts } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { useCurrentWeather } from "@/pages/Home/compositions/useCurrentWeather.ts";
import { useDailyWeatherWeather } from "@/pages/Home/compositions/useDailyWeatherForecast.ts";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
    OutfitImages,
    HeaderToolbar,
  },
  setup() {
    const {
      outfitPosts,
      loaded: loadedOutfitPosts,
      fetchOutfitsPost,
    } = useOutfitPosts();
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

    return {
      outfitPosts,
      currentWeather,
      todaysWeather,
      loadedWeather,
      loadedOutfitPosts,
    };
  },
});
</script>
