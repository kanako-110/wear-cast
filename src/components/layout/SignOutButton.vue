<template>
  <v-btn icon @click="signOut">
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuth } from "@/compositions/useAuth";

export default defineComponent({
  name: "SignOutButton",
  setup() {
    const { signOutUser } = useAuth();

    // TODO; loading
    const signOut = () => {
      const confirmed = confirm("Are you sure you want to sign out?");
      if (confirmed) {
        signOutUser();
      }
    };

    return { signOut };
  },
});
</script>
