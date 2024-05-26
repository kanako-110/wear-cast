<template>
  <!-- forecast? -->
  <v-toolbar title="WearCast">
    <v-btn icon @click="dialog = true">
      <v-icon>mdi-pen-plus</v-icon>
    </v-btn>

    <wear-post-dialog v-model="dialog" />
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import WearPostDialog from "@/pages/Home/components/wear-post-dialog.vue";

export default defineComponent({
  name: "HeaderToolbar",
  components: {
    WearPostDialog,
  },
  setup() {
    const dialog = ref(false);
    return { dialog };
  },
});
</script>
