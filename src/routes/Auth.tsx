import { authService } from "firebaseConfig";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import AuthForm from "components/AuthForm";

type FirebaseProvider = GoogleAuthProvider | GoogleAuthProvider;

const Auth = () => {
  const signInWithPopupProvider = async (provider: FirebaseProvider) => {
    try {
      await signInWithPopup(authService, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const onSocialClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    if (name === "google") {
      const provider = new GoogleAuthProvider();

      signInWithPopupProvider(provider);
    } else if (name === "github") {
      const provider = new GithubAuthProvider();

      signInWithPopupProvider(provider);
    }
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
