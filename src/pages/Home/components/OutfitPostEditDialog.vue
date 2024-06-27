<template>
  <outfit-post-dialog
    v-model="input"
    :loading="false"
    @cancel="cancel"
    @outfit-submit="handleSubmit"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { useAuth } from "@/compositions/useAuth";
import type { Input } from "@/components/layout/OutfitPostDialog.vue";
import OutfitPostDialog from "@/components/layout/OutfitPostDialog.vue";
import type { Post } from "@/pages/Home/compositions/useOutfitPosts.ts";

export default defineComponent({
  name: "OutfitPostEditDialog",
  emits: ["outfit-submit", "cancel"],
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

    const { user } = useAuth();

    const cancel = () => {
      // for (const key in input) {
      //   (input as any)[key] = INITIAL_INPUT[key as keyof Input];
      // }
      emit("cancel");
    };

    const handleSubmit = async () => {
      console.log(user.value.uid);
      emit("outfit-submit");
    };

    return { cancel, input, handleSubmit };
  },
});
</script>
