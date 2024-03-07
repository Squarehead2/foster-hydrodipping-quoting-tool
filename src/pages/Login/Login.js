import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../../_utils/firebase";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null); // User state
  const navigate = useNavigate(); // Access to the navigate function

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("User signed in successfully");
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      setErrorMessage("Error signing in with Google");
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error signing in with Email/Password:", error.message);
      setErrorMessage("Incorrect email or password");
    }
  };

  const handleExportUserData = () => {
    if (user) {
      // Export user data or perform actions with the user object
      console.log("User data:", user);
    } else {
      console.log("User not logged in");
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

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div>
        <button onClick={handleExportUserData}>Export User Data</button>
      </div>

      <div>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};
