import { ref } from "vue";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
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
  const lastVisible = ref(undefined);
  const hasNewPost = ref(true);

  const BATCH_SIZE = 12;

  // fetch today only
  const fetchInitialOutfitPosts = async () => {
    try {
      const q = query(
        collection(db, "outfits"),
        orderBy("createdAt", "desc"),
        limit(BATCH_SIZE)
      );

      const querySnapshot = await getDocs(q);

      outfitPosts.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as OutfitData),
      }));

      // update the last post
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      lastVisible.value = lastDoc;

      // if there is no new post, do not show update button
      if (querySnapshot.empty) {
        hasNewPost.value = false;
      }
    } catch (e) {
      console.error("An error occurred while fetching posts:", e);
    }
    loaded.value = true;
  };

  const loadMoreOutfitPosts = async () => {
    loaded.value = false;
    try {
      if (!lastVisible?.value) return;

      const q = query(
        collection(db, "outfits"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible.value),
        limit(BATCH_SIZE)
      );

      // まとめられるかも
      const querySnapshot = await getDocs(q);

      // showing all again? fix later
      querySnapshot.docs.forEach((doc) => {
        outfitPosts.value = [
          ...outfitPosts.value,
          {
            id: doc.id,
            ...(doc.data() as OutfitData),
          },
        ];
      });

      // update the last post
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      lastVisible.value = lastDoc;

      if (querySnapshot.size <= BATCH_SIZE) {
        hasNewPost.value = false;
      }
    } catch (e) {
      console.error("An error occurred while fetching posts:", e);
    }
    loaded.value = true;
  };

  return {
    outfitPosts,
    loaded,
    fetchInitialOutfitPosts,
    loadMoreOutfitPosts,
    hasNewPost,
  };
};
