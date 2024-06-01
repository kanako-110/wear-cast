<template>
  <header-toolbar />
  <div class="mt-8 d-flex justify-center">
    <weather-card />
  </div>
  <div class="mt-9">
    <!-- TODO; refetch when posted? -->
    <wear-images :posts="outfitPosts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import WearImages from "@/pages/Home/components/WearImages.vue";
import HeaderToolbar from "@/pages/Home/components/header-toolbar.vue";
import { useOutfitPosts } from "@/pages/Home/compositions/useOutfitPosts.ts";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
    WearImages,
    HeaderToolbar,
  },
  setup() {
    const { outfitPosts, fetchOutfitsPost } = useOutfitPosts();

    onMounted(() => {
      fetchOutfitsPost();
    });

    return { outfitPosts };
  },
});
</script>
