import { auth, provider } from "@/firebaseConfig";
import {
  signInWithRedirect,
  onAuthStateChanged,
  User,
  UserCredential,
  signOut,
} from "firebase/auth";
import { inject, onMounted, provide, ref, Ref } from "vue";

type Return = {
  user: Ref<User>;
  loadingAuthState: Ref<boolean>;
  signInWithGoogleLoading: Ref<boolean>;
  signInWithGoogle: Promise<void>;
  signOutUser: () => Promise<void>;
};

const authSymbol = Symbol();

export const createAuth = () => {
  const user = ref<User | null>(null);
  const loadingAuthState = ref(true);
  const signInWithGoogleLoading = ref(false);

  const signInWithGoogle = async () => {
    signInWithGoogleLoading.value = true;
    try {
      const result: UserCredential = await signInWithRedirect(auth, provider);
      user.value = result.user;
    } catch (e) {
      console.error("Error signing in with Google:", e);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (e) {
      console.error("Error signing out:", e);
    }
  };

  onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
      loadingAuthState.value = false;
    });
  });

  provide(authSymbol, {
    user,
    loadingAuthState,
    signInWithGoogleLoading,
    signInWithGoogle,
    signOutUser,
  });
};

export const useAuth = () => {
  const context: Return | undefined = inject(authSymbol);
  if (!context) {
    throw new Error("useAuth must be used within a createAuth provider");
  }
  return context;
};
