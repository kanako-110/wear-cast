import { auth, provider } from "@/firebaseConfig";
import {
  onAuthStateChanged,
  User,
  UserCredential,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { inject, onMounted, provide, ref, Ref } from "vue";

type Return = {
  user: Ref<User>;
  loadingAuthState: Ref<boolean>;
  signInWithGoogleLoading: Ref<boolean>;
  signInWithGoogle: Promise<void>;
  signOutUser: () => Promise<void>;
  signingOut: Ref<boolean>;
};

const authSymbol = Symbol();

export const createAuth = () => {
  const user = ref<User | null>(null);
  const signInWithGoogleLoading = ref(false);
  const loadingAuthState = ref(true);
  const signingOut = ref(false);

  const signInWithGoogle = async () => {
    signInWithGoogleLoading.value = true;
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      user.value = result.user;
    } catch (e) {
      console.error("Error signing in with Google:", e);
    }
  };

  const signOutUser = async () => {
    signingOut.value = true;
    try {
      await signOut(auth);
      user.value = null;
    } catch (e) {
      console.error("Error signing out:", e);
    }
    signingOut.value = false;
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
    signingOut,
  });
};

export const useAuth = () => {
  const context: Return | undefined = inject(authSymbol);
  if (!context) {
    throw new Error("useAuth must be used within a createAuth provider");
  }
  return context;
};
