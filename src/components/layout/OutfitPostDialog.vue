<template>
  <v-card :title="isEditMode ? 'Edit Your Outfit' : 'Share Your Outfit'">
    <!-- validation -->
    <v-card-text>
      <!-- required, string -->
      <v-text-field v-model="modelValue.name" label="Name*" required />
      <v-textarea v-model="modelValue.caption" label="Caption" />
      <!-- required -->

      <template v-if="!isEditMode">
        <v-file-input
          v-model="modelValue.image"
          label="Photo Upload*"
          prepend-icon="mdi-camera"
        />
      </template>
      <template v-else>
        <div class="d-flex text-grey-darken-1">
          <v-icon icon="mdi-camera" />
          <p class="ml-2">{{ modelValue.fileName }}</p>
        </div>
      </template>
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
import { computed, defineComponent, PropType } from "vue";

export type Input = {
  name: string;
  caption: string;
  image?: FileList;
  fileName?: string;
};

export default defineComponent({
  name: "OutfitPostDialog",
  emits: ["outfit-submit", "cancel"],
  props: {
    modelValue: {
      type: Object as PropType<Input>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isEditMode = computed(() => props.modelValue.fileName);

    const closeDialog = () => {
      emit("cancel");
    };

    const handleSubmit = async () => {
      emit("outfit-submit");
    };

    return { closeDialog, handleSubmit, isEditMode };
  },
});
</script>
