<template>
  <!-- TODO: loading UI -->
  <template v-if="!loaded"> loading... </template>
  <template v-else>
    <v-row>
      <v-col
        v-for="post in posts"
        class="d-flex child-flex"
        :key="post.id"
        cols="3"
      >
        <!-- TODO; make sure not to download all at the same time -->
        <v-img
          :lazy-src="placeholderImage"
          :src="post.imageUrl"
          alt="outfit image"
          aspect-ratio="4/3"
          class="bg-grey-lighten-2 h-75"
          cover
        />
        <!--  TODO; loading indicator from https://vuetifyjs.com/en/components/images/#grid-->
      </v-col>
    </v-row>
    <div v-if="hasNewPost" class="my-4 d-flex justify-center">
      <v-btn @click="$emit('load-more-click')"> More </v-btn>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";

export default defineComponent({
  name: "OutfitImages",
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
    loaded: {
      type: Boolean,
      required: true,
    },
    hasNewPost: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["load-more-click"],
  setup() {
    return { placeholderImage };
  },
});
</script>
