"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "../../_utils/firebase";
import { SHA256 } from "crypto-js";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Access to the navigate function

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        SHA256(password).toString()
      );
      console.log("User registered successfully");
      sendEmailVerification(auth.currentUser); // Sends Email Verification to the user
      document.getElementById("my_modal_verify").showModal(); // Show the modal
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert(error.message);
    }
  };

  return (
    <>
      <div class="container max-w-md mx-auto absolute bg-white p-16 text-center rounded-3xl flex justify-center items-center top-1/4">
        <div class="form-container bg-white rounded-lg p-10 shadow-md max-w-md w-full">
          <h2 class="text-3xl text-primary-200 mb-5 font-bold">Register</h2>
          <form>
            <div class="input-container mb-5">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i class="fa-solid fa-envelope text-xl mx ml-1"></i>
            </div>
            <div class="input-container mb-5">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i class="fa-solid fa-lock text-xl ml-1"></i>
            </div>
            <button
              className="btn w-full hover:bg-primary-400 text-white bg-primary-300"
              onClick={handleRegister}
            >
              Register
            </button>
            <p className="text-center">Already Have an account? / Login</p>
          </form>
        </div>
      </div>
      <>
        <dialog id="my_modal_verify" className="modal">
          <div className="modal-box">
            <h2>Please Verify Your Email</h2>
            <p>
              We have sent you an email to verify your account. Please verify
              your account to continue.
            </p>
            <div>
              <form
                method="dialog"
                className="flex w-full space-x-3 flex-row-reverse border-3 border-solid border-purple-100"
              >
                <button>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    </>
  );
};

export default Register;
