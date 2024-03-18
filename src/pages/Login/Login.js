import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
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
    console.log(email);
  });

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
      await signInWithEmailAndPassword(
        auth,
        email,
        SHA256(password).toString()
      );
      console.log("User signed in successfully");
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Error signing in with Email/Password:", error.message);
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <div className="login flex flex-col justify-center items-center">
      <form>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Login With Email</h2>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div className="card-actions">
              <button
                className="btn bg-primary-300 hover:bg-primary-400 text-white"
                onClick={handleEmailPasswordSignIn}
              >
                Login
              </button>
            </div>
            <p className="text-center text-black">Or</p>
            <div class="px-6 sm:px-0 max-w-sm">
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
        <p className="text-black text-sm ">
          {" "}
          Don't have an account? Don't worry signup{" "}
          <Link to="/register" className="text-primary-400 font-bold text-sm">
            here.
          </Link>
        </p>
      </div>
    </div>
  );
};
