import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { ref } from "vue";

export const useOutfitPostDelete = () => {
  const loading = ref(false);

  const deleteOutfitPost = async (id: string, imageUrl: string) => {
    try {
      loading.value = true;
      const outfitRef = doc(db, "outfits", id);
      await deleteDoc(outfitRef);

      const imageRef = storageRef(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (e) {
      console.error("Error deleting outfit and image:", e);
    }
    loading.value = false;
  };

  return { deleteOutfitPost, loading };
};
