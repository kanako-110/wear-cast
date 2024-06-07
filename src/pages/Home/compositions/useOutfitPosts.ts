import { ref } from "vue";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
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

const BATCH_SIZE = 12;

export const useOutfitPosts = () => {
  const loaded = ref(false);
  const outfitPosts = ref<Post[]>([]);
  const lastVisible = ref<
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >(undefined);
  const hasNewPost = ref(true);

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
      if (querySnapshot.size < BATCH_SIZE) {
        hasNewPost.value = false;
      }
    } catch (e) {
      console.error("An error occurred while fetching posts:", e);
    }
    loaded.value = true;
  };

  const loadMoreOutfitPosts = async () => {
    try {
      loaded.value = false;

      if (!lastVisible?.value) return;

      const q = query(
        collection(db, "outfits"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible.value),
        limit(BATCH_SIZE)
      );

      const querySnapshot = await getDocs(q);

      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as OutfitData),
      }));
      outfitPosts.value = outfitPosts.value.concat(newPosts);

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
    fetchInitialOutfitPosts,
    loadMoreOutfitPosts,
    hasNewPost,
    loaded,
  };
};
