import { doc, runTransaction } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const postLike = async (id: string) => {
  const outFitPostRef = doc(db, "outfits", id);

  try {
    await runTransaction(db, async (transaction) => {
      const postDoc = await transaction.get(outFitPostRef);
      if (!postDoc.exists()) {
        throw new Error("Document does not exist!");
      }

      const newLike = (postDoc.data().likes || 0) + 1;
      transaction.update(outFitPostRef, { likes: newLike });
    });
  } catch (e) {
    console.error("Error adding like: ", e);
  }
};
