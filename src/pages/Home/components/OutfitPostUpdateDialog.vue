<template>
  <outfit-post-dialog
    v-model="input"
    :loading="loading"
    @cancel="close"
    @outfit-submit="handleSubmit"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import type { Input } from "@/components/layout/OutfitPostDialog.vue";
import OutfitPostDialog from "@/components/layout/OutfitPostDialog.vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";
import { useOutfitPostUpdate } from "@/pages/Home/compositions/useOutfitPostUpdate.ts";

export default defineComponent({
  name: "OutfitPostUpdateDialog",
  emits: ["outfit-submit", "close"],
  components: {
    OutfitPostDialog,
  },
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const input = reactive<Input>({
      name: props.post.userName,
      caption: props.post.caption,
      fileName: props.post.fileName,
    });

    const { updateOutfitPost, loading } = useOutfitPostUpdate();

    const close = () => {
      emit("close");
    };

    const handleSuccess = () => {
      close();
      emit("outfit-submit");
    };

    const handleSubmit = async () => {
      await updateOutfitPost(props.post.id, input, handleSuccess);
    };

    return { close, input, handleSubmit, loading };
  },
});
</script>
