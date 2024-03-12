"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "../../_utils/firebase";
import "./Register.css";

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
      alert("Email Already In Use");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="text-2xl text-black font-medium ">Register</h2>
        <form>
          <div className="input-container">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <i className="fa-solid fa-envelope text-xl mx "></i>
          </div>
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
            />
            <i className="fa-solid fa-lock text-xl"></i>
          </div>
          <div className="button-container">
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
