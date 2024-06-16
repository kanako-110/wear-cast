<template>
  <header-toolbar @outfit-submit="updateOutfitImages" />
  <div class="mt-8 d-flex justify-center">
    <weather-card
      :most-liked-outfit="mostLikedOutfit"
      :currentWeather="currentWeather"
      :todaysWeather="todaysWeather"
      :loaded="loadedWeatherCard"
    />
  </div>
  <div class="mt-9">
    <!-- empty state -->
    <!-- TODO; refetch when posted? -->
    <!-- TOD; delete? -->
    <outfit-images
      :posts="outfitPosts"
      :local-likes="localLikes"
      :loaded="loadedOutfitPosts"
      :hasNewPost="hasNewPost"
      @load-more-click="fetchMorePosts"
      @like-button-click="postLike"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import OutfitImages from "@/pages/Home/components/OutfitImages.vue";
import HeaderToolbar from "@/pages/Home/components/HeaderToolbar.vue";
import { useOutfitPosts } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { useCurrentWeather } from "@/pages/Home/compositions/useCurrentWeather.ts";
import { useDailyWeatherWeather } from "@/pages/Home/compositions/useDailyWeatherForecast.ts";
import { usePopularOutfit } from "@/pages/Home/compositions/usePopularOutfit.ts";

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
      localLikes,
      hasNewPost,
      loaded: loadedOutfitPosts,
      fetchInitialOutfitPosts,
      loadMoreOutfitPosts,
      postLike,
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

    const {
      mostLikedOutfit,
      fetchPopularOutfit,
      loaded: loadedPopularOutfit,
    } = usePopularOutfit();

    const loadedWeatherCard = computed(
      () =>
        loadedCurrentWeather.value &&
        loadedDailyWeatherForecast.value &&
        loadedPopularOutfit.value
    );

    const fetchMorePosts = () => {
      loadMoreOutfitPosts();
    };

    const updateOutfitImages = () => {
      fetchInitialOutfitPosts();
    };

    onMounted(() => {
      const CITY = "Vancouver";
      getCurrentWeather(CITY);
      getDailyWeatherForecast(CITY);
      fetchInitialOutfitPosts();
      fetchPopularOutfit();
    });

    return {
      outfitPosts,
      currentWeather,
      todaysWeather,
      loadedWeatherCard,
      fetchMorePosts,
      hasNewPost,
      loadedOutfitPosts,
      postLike,
      localLikes,
      mostLikedOutfit,
      updateOutfitImages,
    };
  },
});
</script>
