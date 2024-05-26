<template>
  <v-dialog v-model="modelValue" max-width="600" persistent>
    <v-card title="Share Your Outfit">
      <!-- validation -->
      <v-card-text>
        <!-- required, string -->
        <v-text-field label="Name*" required />
        <v-textarea label="Caption" />
        <!-- required -->
        <v-file-input label="Photo Upload*" prepend-icon="mdi-camera" />
      </v-card-text>

      <template v-slot:actions>
        <v-spacer />
        <v-btn text="cancel" @click="closeDialog"></v-btn>
        <v-btn class="ml-4" text="share" @click="closeDialog"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "WearPostDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const closeDialog = () => {
      emit("update:modelValue", false);
    };
    return { closeDialog };
  },
});
</script>
