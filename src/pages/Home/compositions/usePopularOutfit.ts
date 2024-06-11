import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ref } from "vue";
import { OutfitData } from "@/pages/Home/compositions/useOutfitPosts.ts";
import noOutfitImage from "@/assets/images/no-outfit-image.png";
import { getTodayRange } from "@/utils/getTodayRange.ts";

export const usePopularOutfit = () => {
  const mostLikedOutfit = ref<OutfitData | undefined>();
  const loaded = ref(false);

  const { startOfDay, endOfDay } = getTodayRange();

  const fetchPopularOutfit = async () => {
    try {
      const q = query(
        collection(db, "outfits"),
        where("createdAt", ">=", startOfDay),
        where("createdAt", "<=", endOfDay),
        orderBy("likes", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        mostLikedOutfit.value = {
          imageUrl: noOutfitImage,
          createdAt: new Date("2024/06/11"),
          userName: "Website owner",
          caption:
            "No outfits have been posted today yet, we're waiting for your post!",
          likes: 0,
        };
      } else {
        const doc = querySnapshot.docs[0];
        mostLikedOutfit.value = doc.data() as OutfitData;
      }
    } catch (e) {
      console.error("An error occurred while fetching popular outfit:", e);
    }
    loaded.value = true;
  };

  return { mostLikedOutfit, fetchPopularOutfit, loaded };
};
