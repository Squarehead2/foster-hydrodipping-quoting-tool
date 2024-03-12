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
    <div className="w-full flex items-center justify-center">
        <div className="w-full text-center my-3">
      <h2 className="text-2xl text-black font-medium">Register</h2>
     
      <form>
      <div className="flex border-b-black border-b-2 mx-5 my-7 mr-5 py-1">
        <input
        type="text"
        className="w-11/12 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=" Enter your email"
        />
        <div className="w-2/12 flex items-center justify-center">
          <i className="fa-solid fa-envelope text-xl"></i>
        </div>
      </div>
      
      <div className="flex  border-b-black border-b-2 mx-5 my-7 mr-5 py-1">  
        <input
        type="password"
        className="w-11/12 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder=" Create password"
        />
        <div className="w-2/12 flex items-center justify-center">
          <i className="fa-solid fa-lock text-xl"></i>
        </div>
      </div>

        <button className="bg-black" type="submit" onClick={handleRegister}>
          Register
        </button>
        <div>
          <p className=" text-center">Already Have an account? / Login</p>
        </div>
      </form>
    </div>
    </div>
  );
};

