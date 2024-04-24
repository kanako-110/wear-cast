<template>
  <div class="my-8 d-flex justify-center">
    <weather-card />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
  },
});
</script>
