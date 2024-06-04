import { ref } from "vue";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";

type OutfitData = {
  imageUrl: string;
  createdAt: Date;
  userName: string;
  caption: string | undefined;
};

export type Post = {
  id: string;
} & OutfitData;

export const useOutfitPosts = () => {
  const outfitPosts = ref<Post[]>([]);
  const loaded = ref(false);

  const fetchOutfitsPost = async () => {
    try {
      const q = query(collection(db, "outfits"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      outfitPosts.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as OutfitData),
      }));
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
    loaded.value = true;
  };

  return { outfitPosts, loaded, fetchOutfitsPost };
};
