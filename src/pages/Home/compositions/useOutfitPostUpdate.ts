import { db } from "@/firebaseConfig";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import type { Input } from "@/components/layout/OutfitPostDialog.vue";

export const useOutfitPostUpdate = () => {
  const loading = ref(false);

  const updateOutfitPost = async (
    id: string,
    input: Input,
    onSuccess: () => void
  ) => {
    try {
      loading.value = true;
      const docRef = doc(db, "outfits", id);

      await updateDoc(docRef, {
        userName: input.name,
        caption: input.caption,
        updatedAt: serverTimestamp(),
      });
      onSuccess();
    } catch (e) {
      console.error("Error updating outfits document:", e);
    }
    loading.value = false;
  };

  return { updateOutfitPost, loading };
};
