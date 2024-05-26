<template>
  <v-dialog v-model="modelValue" width="auto" persistent>
    <v-card title="Dialog">
      <template v-slot:actions>
        <v-btn class="ms-auto" text="cancel" @click="closeDialog"></v-btn>
        <v-btn class="ms-auto" text="post" @click="closeDialog"></v-btn>
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
