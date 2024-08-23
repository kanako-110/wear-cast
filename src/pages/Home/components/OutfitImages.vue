<template>
  <v-row>
    <v-col v-for="post in posts" :key="post.id" cols="3">
      <div v-if="isOwner(post.uid)" class="text-right">
        <action-menu
          :post="post"
          @outfit-update="$emit('outfit-update')"
          @outfit-post-deleted="$emit('outfit-post-deleted')"
        />
      </div>
      <!-- Memo: To ensure consistent height when there are no action button, a height of 36px is added" -->
      <v-img
        :lazy-src="placeholderImage"
        :src="post.imageUrl"
        :alt="post.alt || 'Today\'s outfit'"
        aspect-ratio="4/3"
        class="outfit-image bg-grey-lighten-2 h-75"
        :class="{ '-no-owner': !isOwner(post.uid) }"
        cover
      />
      <div class="text-right mt-2">
        <v-btn
          aria-label="Like"
          icon="mdi-heart-outline"
          @click="$emit('like-button-click', post.id)"
        />
        <p class="mt-1">{{ getLikeCount(post.id) }} likes</p>
      </div>
    </v-col>
  </v-row>
  <div v-if="hasNewPost && loaded" class="my-4 d-flex justify-center">
    <v-btn @click="$emit('load-more-click')"> Load more </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type {
  Post,
  LocalLike,
} from "@/pages/Home/compositions/useOutfitPosts.ts";
import placeholderImage from "@/assets/images/placeholder-image.png";
import ActionMenu from "@/pages/Home/components/ActionMenu.vue";
import { useAuth } from "@/compositions/useAuth";

export default defineComponent({
  name: "OutfitImages",
  components: { ActionMenu },
  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },
    localLikes: {
      type: Array as PropType<LocalLike[]>,
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
  emits: [
    "load-more-click",
    "like-button-click",
    "outfit-update",
    "outfit-post-deleted",
  ],
  setup(props) {
    const { user } = useAuth();

    const isOwner = (postOwnerUid: string) => user.value.uid === postOwnerUid;

    const getLikeCount = (id: string) => {
      const target = props.localLikes.find((like) => like.hasOwnProperty(id));
      if (!target) return 0;
      return target[id] || 0;
    };

    return { placeholderImage, getLikeCount, isOwner };
  },
});
</script>

<style lang="scss" scoped>
.outfit-image {
  &.-no-owner {
    margin-top: 36px;
  }
}
</style>
