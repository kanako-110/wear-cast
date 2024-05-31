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
import { defineComponent, onMounted, ref } from "vue";
import WeatherCard from "@/pages/Home/components/WeatherCard.vue";
import WearImages from "@/pages/Home/components/WearImages.vue";
import HeaderToolbar from "@/pages/Home/components/header-toolbar.vue";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";

export default defineComponent({
  name: "HomeIndex",
  components: {
    WeatherCard,
    WearImages,
    HeaderToolbar,
  },
  setup() {
    const outfitPosts = ref([]);

    const fetchOutfitsPost = async () => {
      try {
        const q = query(
          collection(db, "outfits"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        outfitPosts.value = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    onMounted(() => {
      fetchOutfitsPost();
    });

    return { outfitPosts };
  },
});
</script>
