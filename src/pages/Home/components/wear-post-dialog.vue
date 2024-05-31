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

      <!-- TODO; loading layout -->
      <template v-if="loading" v-slot:append>
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
import { defineComponent, reactive, ref } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

export default defineComponent({
  // outfitsに変える
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
    const loading = ref(false);
    const closeDialog = () => {
      emit("update:modelValue", false);
    };

    const submit = async () => {
      const file = input.image[0];
      const uniqueFileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}_${file.name}`;
      const storageReference = storageRef(storage, `outfits/${uniqueFileName}`);

      try {
        loading.value = true;
        // Upload the file to Firebase Storage
        console.log({ file });
        const snapshot = await uploadBytes(storageReference, file);

        // Get the file's download URL
        const downloadURL = await getDownloadURL(snapshot.ref);

        await addDoc(collection(db, "outfits"), {
          user_name: input.name,
          caption: input.caption,
          imageUrl: downloadURL,
          createdAt: serverTimestamp(),
        });
        closeDialog();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      loading.value = false;
    };
    return { closeDialog, input, submit, loading };
  },
});
</script>
