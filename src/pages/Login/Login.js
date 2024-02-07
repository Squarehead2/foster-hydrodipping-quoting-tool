"use client";

import React, { useState } from "react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../../_utils/firebase"; // Import the Firebase configuration

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
    } catch (error) {
      console.error("Error signing in with Email/Password:", error.message);
    }
  };

  return (
    <div className="login">
      <form>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" onClick={handleEmailPasswordSignIn}>
          Login with Email/Password
        </button>
      </form>

      <div>
        <button onClick={handleGoogleSignIn}>Login with Google</button>
      </div>
    </div>
  );
};
