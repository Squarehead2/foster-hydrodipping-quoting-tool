"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../../_utils/firebase";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Access to the navigate function

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully");
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      console.error("Error registering user:", error.message);
      alert("Error Registering User");
    }
  };

  return (
    <div class="container max-w-md mx-auto absolute bg-white p-16 text-center rounded-3xl flex justify-center items-center top-1/4">
      <div class="form-container bg-white rounded-lg p-10 shadow-md max-w-md w-full">
        <h2 class="text-3xl text-primary-200 font-light">Register</h2>
        <form>
          <div class="input-container mb-5">
            <input
              type="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <i class="fa-solid fa-envelope text-xl mx ml-1"></i>
          </div>
          <div class="input-container mb-5">
            <input
              type="password"
              class="w-full px-4 py-3 border border-gray-300 rounded-md outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
            />
            <i class="fa-solid fa-lock text-xl ml-1"></i>
          </div>
          <div class="w-full py-3 bg-primary-300 text-white rounded-md cursor-pointer hover:bg-primary-400">
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
          </div>
          <p className="text-center">Already Have an account? / Login</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
