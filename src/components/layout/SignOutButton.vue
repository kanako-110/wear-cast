<template>
  <v-btn icon @click="signOut">
    <v-icon>mdi-logout</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignOutButton",
  setup() {
    const signOut = () => {
      const confirmed = confirm("Are you sure you want to sign out?");
      if (confirmed) {
        console.log("signOut");
      }
    };

    return { signOut };
  },
});
</script>
