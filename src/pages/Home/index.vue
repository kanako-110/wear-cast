<template>
  <header-toolbar @outfit-submit="refetchOutfitImages" />
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
    <outfit-images
      :posts="outfitPosts"
      :local-likes="localLikes"
      :loaded="loadedOutfitPosts"
      :hasNewPost="hasNewPost"
      @load-more-click="fetchMorePosts"
      @like-button-click="postLike"
      @outfit-submit="refetchOutfitImages"
      @outfit-post-deleted="refetchOutfitImages"
    />
  </div>
  <div v-if="user" class="my-3 mr-6 text-right">
    <sign-out />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import OutfitImages from "@/pages/Home/components/OutfitImages.vue";
import HeaderToolbar from "@/components/layout/HeaderToolbar.vue";
import { useOutfitPosts } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { useCurrentWeather } from "@/pages/Home/compositions/useCurrentWeather.ts";
import { useDailyWeatherWeather } from "@/pages/Home/compositions/useDailyWeatherForecast.ts";
import { usePopularOutfit } from "@/pages/Home/compositions/usePopularOutfit.ts";
import SignOut from "@/components/layout/SignOut.vue";
import { useAuth } from "@/compositions/useAuth";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
    OutfitImages,
    HeaderToolbar,
    SignOut,
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

    const { user } = useAuth();

    const loadedWeatherCard = computed(
      () =>
        loadedCurrentWeather.value &&
        loadedDailyWeatherForecast.value &&
        loadedPopularOutfit.value
    );

    const fetchMorePosts = () => {
      loadMoreOutfitPosts();
    };

    const refetchOutfitImages = () => {
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
      refetchOutfitImages,
      user,
    };
  },
});
</script>
