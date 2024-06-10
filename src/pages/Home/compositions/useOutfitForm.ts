import { ref } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import type { Input } from "@/pages/Home/components/OutfitPostDialog.vue";

export const useOutfitForm = () => {
  const loading = ref(false);

  const submit = async (input: Input, onSuccess: () => void) => {
    if (!input.image?.length) return;

    const file = input.image[0];
    const uniqueFileName = `${Date.now()}_${Math.random()
      .toString(36)
      .substring(2)}_${file.name}`;
    const storageReference = storageRef(storage, `outfits/${uniqueFileName}`);

    try {
      loading.value = true;
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageReference, file);

      // Get the file's download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "outfits"), {
        useName: input.name,
        caption: input.caption,
        imageUrl: downloadURL,
        createdAt: serverTimestamp(),
        likes: 0,
      });
      onSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    loading.value = false;
  };

  return { submit, loading };
};
