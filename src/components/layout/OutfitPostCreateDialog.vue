<template>
  <outfit-post-dialog
    v-model="input"
    :loading="loading"
    @cancel="cancel"
    @outfit-submit="handleSubmit"
  />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useOutfitForm } from "@/pages/Home/compositions/useOutfitForm";
import { useAuth } from "@/compositions/useAuth";
import type { Input } from "@/components/layout/OutfitPostDialog.vue";
import OutfitPostDialog from "@/components/layout/OutfitPostDialog.vue";

export default defineComponent({
  name: "OutfitPostCreateDialog",
  emits: ["outfit-submit", "cancel"],
  components: {
    OutfitPostDialog,
  },
  setup(_, { emit }) {
    const INITIAL_INPUT: Input = {
      name: "",
      caption: "",
      image: undefined,
    };

    const input = reactive({ ...INITIAL_INPUT });

    const { user } = useAuth();

    const cancel = () => {
      for (const key in input) {
        (input as any)[key] = INITIAL_INPUT[key as keyof Input];
      }
      emit("cancel");
    };

    const { submit, loading } = useOutfitForm();

    const handleSubmit = async () => {
      await submit(input, cancel, user.value.uid);
      emit("outfit-submit");
    };

    return { cancel, input, handleSubmit, loading };
  },
});
</script>
