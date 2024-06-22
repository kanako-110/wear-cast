<template>
  <v-card title="Share Your Outfit">
    <!-- validation -->
    <v-card-text>
      <!-- required, string -->
      <v-text-field v-model="input.name" label="Name*" required />
      <v-textarea v-model="input.caption" label="Caption" />
      <!-- required -->

      <v-file-input
        v-model="input.image"
        label="Photo Upload*"
        prepend-icon="mdi-camera"
      />
    </v-card-text>

    <template v-slot:actions>
      <v-spacer />
      <v-btn text="cancel" :disabled="loading" @click="closeDialog"></v-btn>
      <v-btn
        class="ml-4"
        :disabled="loading"
        text="share"
        @click="handleSubmit"
      ></v-btn>
    </template>

    <template v-if="loading" v-slot:append>
      <v-progress-circular
        color="primary"
        indeterminate="disable-shrink"
        size="16"
        width="2"
      ></v-progress-circular>
    </template>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useOutfitForm } from "@/pages/Home/compositions/useOutfitForm";

export type Input = {
  name: string;
  caption: string;
  image?: FileList;
};

export default defineComponent({
  name: "OutfitPostDialog",
  emits: ["outfit-submit", "cancel"],
  setup(_, { emit }) {
    const INITIAL_INPUT: Input = {
      name: "",
      caption: "",
      image: undefined,
    };

    const input = reactive({ ...INITIAL_INPUT });

    const closeDialog = () => {
      emit("cancel");
      for (const key in input) {
        (input as any)[key] = INITIAL_INPUT[key as keyof Input];
      }
    };

    const { submit, loading } = useOutfitForm();

    const handleSubmit = async () => {
      await submit(input, closeDialog);
      emit("outfit-submit");
    };

    return { closeDialog, input, handleSubmit, loading };
  },
});
</script>
