import { ref } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import type { Input } from "@/components/layout/OutfitPostDialog.vue";

export const useOutfitForm = () => {
  const loading = ref(false);

  const submit = async (input: Input, onSuccess: () => void, uid: string) => {
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

      const { image, ...inputWIthNoImageInfo } = input;

      await addDoc(collection(db, "outfits"), {
        ...inputWIthNoImageInfo,
        // picture use processed data
        imageUrl: downloadURL,
        fileName: file.name,
        createdAt: serverTimestamp(),
        likes: 0,
        uid: uid,
      });
      onSuccess();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    loading.value = false;
  };

  return { submit, loading };
};
