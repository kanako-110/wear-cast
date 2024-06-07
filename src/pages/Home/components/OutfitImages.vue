<template>
  <v-row>
    <v-col
      v-for="post in posts"
      class="d-flex child-flex"
      :key="post.id"
      cols="3"
    >
      <v-img
        :lazy-src="placeholderImage"
        :src="post.imageUrl"
        alt="outfit image"
        aspect-ratio="4/3"
        class="bg-grey-lighten-2 h-75"
        cover
      />
    </v-col>
  </v-row>
  <div v-if="hasNewPost && loaded" class="my-4 d-flex justify-center">
    <v-btn @click="$emit('load-more-click')"> Load more </v-btn>
  </div>
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
