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
  doc,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getTodayRange } from "@/utils/getTodayRange.ts";

export type OutfitData = {
  imageUrl: string;
  createdAt: Date;
  userName: string;
  caption: string | undefined;
  likes: number;
  uid: string;
};

export type Post = {
  id: string;
} & OutfitData;

export type LocalLike = {
  [key: string]: number | undefined;
};

export const useOutfitPosts = () => {
  const BATCH_SIZE = 12;

  const loaded = ref(false);
  const outfitPosts = ref<Post[]>([]);
  const localLikes = ref<LocalLike[]>([]);
  const lastVisible = ref<
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >(undefined);
  const hasNewPost = ref(true);

  const { startOfDay, endOfDay } = getTodayRange();

  const fetchInitialOutfitPosts = async () => {
    try {
      loaded.value = false;
      // TODO; maybe define this on parent component?
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

      localLikes.value = querySnapshot.docs.map((doc) => {
        const docId = doc.id;
        return {
          [docId]: doc.data().likes as number,
        };
      });

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

      localLikes.value = querySnapshot.docs.map((doc) => {
        const docId = doc.id;
        return {
          [docId]: doc.data().likes as number,
        };
      });

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

  const postLike = async (id: string) => {
    const outFitPostRef = doc(db, "outfits", id);

    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(outFitPostRef);
        if (!postDoc.exists()) {
          throw new Error("Document does not exist!");
        }

        const newLike = (postDoc.data().likes || 0) + 1;
        transaction.update(outFitPostRef, { likes: newLike });

        // Update UI
        const localTarget = localLikes.value.find((obj) =>
          obj.hasOwnProperty(id)
        );
        if (localTarget && typeof localTarget[id] === "number") {
          localTarget[id] += 1;
        } else {
          console.error(`Error: Key ${id} not found or value is not a number`);
        }
      });
    } catch (e) {
      console.error("Error adding like: ", e);
    }
  };

  return {
    outfitPosts,
    fetchInitialOutfitPosts,
    loadMoreOutfitPosts,
    postLike,
    hasNewPost,
    loaded,
    localLikes,
  };
};
