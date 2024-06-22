<template>
  <v-btn icon @click="isDialogOpen = true">
    <v-icon>mdi-logout</v-icon>
  </v-btn>

  <v-dialog v-model="isDialogOpen" max-width="600">
    <v-card title="Sign out">
      <v-card-text> Are you sure you want to sign out? </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo-darken-3" :disabled="signingOut" @click="close"
          >Cancel</v-btn
        >
        <v-btn color="indigo-darken-3" :disabled="signingOut" @click="signOut"
          >Sign out</v-btn
        >
      </v-card-actions>

      <template v-if="signingOut" v-slot:append>
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
import { defineComponent, ref } from "vue";
import { useAuth } from "@/compositions/useAuth";

export default defineComponent({
  name: "SignOut",
  setup() {
    const isDialogOpen = ref(false);

    const { signOutUser, signingOut } = useAuth();

    const close = () => {
      isDialogOpen.value = false;
    };

    const signOut = async () => {
      await signOutUser();
      close();
    };

    return { isDialogOpen, signOut, signingOut, close };
  },
});
</script>
