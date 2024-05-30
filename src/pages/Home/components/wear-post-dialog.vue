<template>
  <v-dialog v-model="modelValue" max-width="600" persistent>
    <v-card title="Share Your Outfit">
      <!-- validation -->
      <v-card-text>
        <!-- required, string -->
        <v-text-field v-model="input.name" label="Name*" required />
        <v-textarea v-model="input.caption" label="Caption" />
        <!-- required -->
        <v-file-input
          v-model="input.image"
          label="Photo Upload*"
          prepend-icon="mdi-camera"
        />
      </v-card-text>

      <template v-slot:actions>
        <v-spacer />
        <v-btn text="cancel" @click="closeDialog"></v-btn>
        <v-btn class="ml-4" text="share" @click="submit"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default defineComponent({
  name: "WearPostDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const input = reactive({
      name: "",
      caption: "",
      image: undefined,
    });
    const closeDialog = () => {
      emit("update:modelValue", false);
    };

    const submit = async () => {
      try {
        // TODO; add loading
        await addDoc(collection(db, "wear_posts"), {
          user_name: input.name,
          caption: input.caption,
          // TODO; image
        });
        closeDialog();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    return { closeDialog, input, submit };
  },
});
</script>
