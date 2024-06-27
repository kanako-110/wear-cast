<template>
  <v-card :title="feature">
    <v-card-text> Are you sure you want to {{ feature }}? </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="indigo-darken-3" :disabled="loading" @click="close"
        >Cancel</v-btn
      >
      <v-btn
        color="indigo-darken-3"
        :disabled="loading"
        @click="handleConfirmed"
        >{{ feature }}</v-btn
      >
    </v-card-actions>

    <template v-if="loading" v-slot:append>
      <v-progress-circular
        color="primary"
        indeterminate="disable-shrink"
        size="16"
        width="2"
      />
    </template>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ConfirmDialog",
  props: {
    feature: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close", "confirmed"],
  setup(_, { emit }) {
    const close = () => {
      emit("close");
    };

    const handleConfirmed = async () => {
      emit("confirmed");
    };

    return { handleConfirmed, close };
  },
});
</script>
