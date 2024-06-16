<!-- move to shared? -->
<template>
  <!-- forecast? -->
  <v-toolbar title="WearCast">
    <v-btn icon @click="isDialogOpen = true">
      <v-icon>mdi-pen-plus</v-icon>
    </v-btn>

    <v-dialog v-model="isDialogOpen" max-width="600" persistent>
      <authentication-dialog v-if="!hasLoggedIn" />
      <outfit-post-dialog
        v-else
        @cancel="cancel"
        @outfit-submit="$emit('outfit-submit')"
      />
    </v-dialog>
  </v-toolbar>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import OutfitPostDialog from "@/pages/Home/components/OutfitPostDialog.vue";
import AuthenticationDialog from "@/components/layout/AuthenticationDialog.vue";

export default defineComponent({
  name: "HeaderToolbar",
  components: {
    OutfitPostDialog,
    AuthenticationDialog,
  },
  emits: ["outfit-submit"],
  setup() {
    const isDialogOpen = ref(false);

    const hasLoggedIn = computed(() => {
      // fetch loginStatus from firebase
      return false;
    });

    const cancel = () => {
      isDialogOpen.value = false;
    };
    return { isDialogOpen, cancel, hasLoggedIn };
  },
});
</script>
