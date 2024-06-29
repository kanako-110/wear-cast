<template>
  <confirm-dialog
    feature="Delete"
    :loading="loading"
    @cancel="cancel"
    @confirmed="deletePost"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import ConfirmDialog from "@/components/layout/ConfirmDialog.vue";
import { useOutfitPostDelete } from "@/pages/Home/compositions/useOutfitPostDelete";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";

export default defineComponent({
  name: "OutfitPostDeleteConfirmModal",
  components: { ConfirmDialog },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  emits: ["outfit-post-deleted", "cancel"],
  setup(props, { emit }) {
    const { deleteOutfitPost, loading } = useOutfitPostDelete();

    const cancel = () => {
      emit("cancel");
    };

    const deletePost = async () => {
      await deleteOutfitPost(props.post.id, props.post.imageUrl);
      emit("outfit-post-deleted");
    };

    return { deletePost, cancel, loading };
  },
});
</script>
