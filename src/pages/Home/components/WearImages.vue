<template>
  <v-row>
    <v-col
      v-for="post in posts"
      class="d-flex child-flex"
      :key="post.id"
      cols="3"
    >
      <v-img
        :lazy-src="post.imageUrl"
        alt="outfit image"
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
  props: {
    posts: {
      // type
      type: Array,
      required: true,
    },
  },
});
</script>
