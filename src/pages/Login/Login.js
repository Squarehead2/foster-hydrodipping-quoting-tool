import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "../../_utils/firebase";
import "./Login.css";
import InputField from "../../components/inputFields";
import { SHA256 } from "crypto-js";

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

      updateProfile(auth.currentUser, {
        // Auto Verify users who sign in through google
        emailVerified: true,
      });

      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      setErrorMessage("Error signing in with Google");
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      const userDetails = await signInWithEmailAndPassword(
        auth,
        email,
        SHA256(password).toString()
      );

      const user = userDetails.user;

      if (!user.emailVerified) {
        signOut(auth); // Sign out the user
        alert("Please verify your email address");
        return;
      } else {
        console.log("User signed in successfully");
        navigate("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      console.error("Error signing in with Email/Password:", error.message);
      setErrorMessage("Incorrect email or password");
    }
  };

  return !user ? (
    <div className="login flex flex-col p-16 justify-center items-center">
      <form>
        <div className="card p-5 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Login With Email</h2>
            <div className="indicator mt-5">
              <i className="fa-solid fa-envelope text-xl mx ml-1 indicator-item indicator-top indicator-start"></i>
              <label className="input input-bordered flex items-center gap-2 text-white">
                <input
                  type="text"
                  className="grow text-white"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="indicator mt-4">
              <i className="fa-solid fa-lock text-xl ml-1 indicator-item indicator-top indicator-start"></i>
              <label className="input input-bordered flex items-center gap-2 text-black">
                <input
                  type="password"
                  className="grow text-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            <div className="card-actions w-full">
              <button
                className="btn bg-primary-300 hover:bg-primary-400 text-white w-full mt-4
                "
                onClick={handleEmailPasswordSignIn}
              >
                Login
              </button>
            </div>
            <p className="text-center text-black">Or</p>
            <div class="px-6 sm:px-0 max-w-sm w-full">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
              >
                <svg
                  class="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign up with Google<div></div>
              </button>
            </div>
          </div>
        </div>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="flex justify-start">
        <p className="text-black text-sm text-center">
          {" "}
          Don't have an account? Don't worry signup{" "}
          <Link to="/register" className="text-primary-400 font-bold text-sm">
            here.
          </Link>
        </p>
      </div>
    </div>
  ) : (
    <div>Already logged in</div>
  );
};
