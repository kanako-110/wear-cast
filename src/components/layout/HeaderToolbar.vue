<template>
  <!-- forecast? -->
  <v-toolbar color="white">
    <v-spacer />
    <v-toolbar-title class="text-h5 font-weight-bold title"
      >WearCast</v-toolbar-title
    >
    <v-btn
      icon="mdi-pen-plus"
      aria-label="Create post"
      @click="isDialogOpen = true"
    />

    <v-dialog v-model="isDialogOpen" max-width="600" persistent>
      <authentication-dialog
        v-if="!user"
        type="signIn"
        text="To post, let's log in first!"
      />
      <outfit-post-create-dialog
        v-else
        @close="close"
        @outfit-submit="$emit('outfit-submit')"
      />
    </v-dialog>
  </v-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import OutfitPostCreateDialog from "@/components/layout/OutfitPostCreateDialog.vue";
import AuthenticationDialog from "@/components/layout/AuthenticationDialog.vue";
import { useAuth } from "@/compositions/useAuth";

export default defineComponent({
  name: "HeaderToolbar",
  components: {
    OutfitPostCreateDialog,
    AuthenticationDialog,
  },
  emits: ["outfit-submit"],
  setup() {
    const isDialogOpen = ref(false);
    const { user } = useAuth();

    const close = () => {
      isDialogOpen.value = false;
    };
    return { isDialogOpen, close, user };
  },
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");

.title {
  font-family: "Alfa Slab One";
}
</style>
