import { doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

export const deleteOutfitPost = async (id: string, imageUrl: string) => {
  try {
    const outfitRef = doc(db, "outfits", id);
    await deleteDoc(outfitRef);

    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (e) {
    console.error("Error deleting outfit and image:", e);
  }
};
