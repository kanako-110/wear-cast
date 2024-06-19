<template>
  <v-card :title="title">
    <div class="pa-5">
      <v-card-text> {{ text }} </v-card-text>
      <v-card-actions>
        <v-btn
          class="my-0 mx-auto"
          color="indigo-darken-3"
          variant="elevated"
          @click="signInWithGoogle"
          >Sign in with Google</v-btn
        >
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useAuth } from "@/compositions/useAuth";

type Type = "signIn" | "signup";

export default defineComponent({
  name: "AuthenticationDialog",
  props: {
    type: {
      type: String as PropType<Type>,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { signInWithGoogle } = useAuth();
    const title = props.type === "signIn" ? "Sign In" : "Sign Up";

    return { title, signInWithGoogle };
  },
});
</script>
