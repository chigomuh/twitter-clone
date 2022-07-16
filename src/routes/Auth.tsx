import { authService } from "firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { FirebaseError } from "firebase/app";

type FirebaseProvider = GoogleAuthProvider | GoogleAuthProvider;

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (newAccount) {
        await createUserWithEmailAndPassword(authService, email, password);
      } else {
        await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error);
        setError(error.code);
      }
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

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
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        <span>{error}</span>
      </form>

      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>

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
