<template>
  <v-dialog v-model="modelValue" max-width="600" persistent>
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
        <v-btn text="cancel" @click="closeDialog"></v-btn>
        <v-btn class="ml-4" text="share" @click="handleSubmit"></v-btn>
      </template>

      <!-- TODO; loading layout -->
      <template v-if="loading" v-slot:append>
        <v-progress-circular
          color="primary"
          indeterminate="disable-shrink"
          size="16"
          width="2"
        ></v-progress-circular>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useClothesForm } from "@/pages/Home/compositions/useClothesForm.ts";

export type Input = {
  name: string;
  caption: string;
  image?: FileList;
};

export default defineComponent({
  // outfitsに変える
  name: "WearPostDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const INITIAL_INPUT: Input = {
      name: "",
      caption: "",
      image: undefined,
    };

    const input = reactive({ ...INITIAL_INPUT });

    const closeDialog = () => {
      emit("update:modelValue", false);
      for (const key in input) {
        (input as any)[key] = INITIAL_INPUT[key as keyof Input];
      }
    };

    const { submit, loading } = useClothesForm();

    const handleSubmit = () => submit(input, closeDialog);

    return { closeDialog, input, handleSubmit, loading };
  },
});
</script>
