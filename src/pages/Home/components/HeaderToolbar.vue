<template>
  <!-- forecast? -->
  <v-toolbar title="WearCast">
    <v-btn icon @click="dialog = true">
      <v-icon>mdi-pen-plus</v-icon>
    </v-btn>

    <outfit-post-dialog
      v-model="dialog"
      @outfit-submit="$emit('outfit-submit')"
    />
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import OutfitPostDialog from "@/pages/Home/components/OutfitPostDialog.vue";

export default defineComponent({
  name: "HeaderToolbar",
  components: {
    OutfitPostDialog,
  },
  emits: ["outfit-submit"],
  setup() {
    const dialog = ref(false);
    return { dialog };
  },
});
</script>
