<template>
  <v-btn icon="mdi-logout" aria-label="sign out" @click="isDialogOpen = true" />

  <v-dialog v-model="isDialogOpen" max-width="600">
    <confirm-dialog
      feature="sign out"
      :loading="signingOut"
      @cancel="close"
      @confirmed="signOut"
    />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuth } from "@/compositions/useAuth";
import ConfirmDialog from "@/components/layout/ConfirmDialog.vue";

export default defineComponent({
  name: "SignOut",
  components: { ConfirmDialog },
  setup() {
    const isDialogOpen = ref(false);

    const { signOutUser, signingOut } = useAuth();

    const close = () => {
      isDialogOpen.value = false;
    };

    const signOut = async () => {
      await signOutUser(close);
    };

    return { isDialogOpen, signOut, signingOut, close };
  },
});
</script>
