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
  where,
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

const getTodayRange = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  console.log(startOfDay, endOfDay);

  return { startOfDay, endOfDay };
};

export const useOutfitPosts = () => {
  const BATCH_SIZE = 12;

  const loaded = ref(false);
  const outfitPosts = ref<Post[]>([]);
  const lastVisible = ref<
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >(undefined);
  const hasNewPost = ref(true);

  const { startOfDay, endOfDay } = getTodayRange();

  const fetchInitialOutfitPosts = async () => {
    try {
      const q = query(
        collection(db, "outfits"),
        where("createdAt", ">=", startOfDay),
        where("createdAt", "<=", endOfDay),
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
        where("createdAt", ">=", startOfDay),
        where("createdAt", "<=", endOfDay),
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

      // if there is no new post, do not show update button
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
