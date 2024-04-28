<template>
  <v-row>
    <v-col
      v-for="wear in wearData"
      class="d-flex child-flex"
      :key="wear.id"
      cols="3"
    >
      <v-img
        :lazy-src="wear.image"
        :alt="wear.alt"
        aspect-ratio="4/3"
        class="bg-grey-lighten-2 h-75"
        cover
      />
      <!--  TODO; loading indicator from https://vuetifyjs.com/en/components/images/#grid-->
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WearImages",
  setup() {
    // TODO: fetch wear data
    const wearData = [
      {
        id: 1,
        image:
          "https://images.unsplash.com/photo-1619042823674-4f4ad8484b08?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "T-shirt",
      },
      {
        id: 2,
        image:
          "https://plus.unsplash.com/premium_photo-1684783848102-7946d8930369?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Shorts",
      },
      {
        id: 3,
        image:
          "https://images.unsplash.com/photo-1614533708409-fdad0805a4fa?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Sneakers",
      },
      {
        id: 4,
        image:
          "https://images.unsplash.com/photo-1587754539999-b5f5492704c3?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Sneakers",
      },
    ];
    return { wearData };
  },
});
</script>
