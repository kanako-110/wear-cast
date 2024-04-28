<template>
  <div class="mt-8 d-flex justify-center">
    <weather-card />
  </div>
  <div class="mt-9">
    <wear-images />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import WearImages from "@/pages/Home/components/WearImages.vue";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
    WearImages,
  },
});
</script>
