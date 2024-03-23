import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "../../_utils/firebase";
import { SHA256 } from "crypto-js";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaLetters, setCaptchaLetters] = useState([]);
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const navigate = useNavigate(); // Access to the navigate function
  const fonts = ["cursive", "fantasy", "monospace", "sans-serif", "serif", "system-ui"];

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const randomText = Math.random().toString(36).substr(2, 6); // Generate a random string
    const captchaLetters = randomText.split('').map((letter) => ({
      value: letter,
      rotation: generateRandomRotation(),
      font: generateRandomFont()
    }));
    setCaptchaLetters(captchaLetters);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const enteredCaptchaText = captchaLetters.map((letter) => letter.value).join('');
    if (enteredCaptcha !== enteredCaptchaText) {
      alert("Please enter the correct captcha text");
      return;
    }
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

  const handleCaptchaInputChange = (e) => {
    setEnteredCaptcha(e.target.value);
  };

  const generateRandomRotation = () => {
    return Math.floor(Math.random() * 21) - 10; // Generate a random rotation between -10 and 10 degrees
  };

  const generateRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)]; // Randomly select a font from the available fonts
  };

  return (
    <>
      <div className="container max-w-md mx-auto absolute bg-white p-16 text-center rounded-3xl flex justify-center items-center ">
        <div className="form-container bg-white rounded-lg p-10 shadow-md max-w-md w-full">
          <h2 className="text-3xl text-primary-200 mb-5 font-bold">Register</h2>
          <form>
            <div className="input-container mb-5">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope text-xl mx ml-1"></i>
            </div>
            <div className="input-container mb-5">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs text-white"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-lock text-xl ml-1"></i>
            </div>
            <div className="captcha">
              <label htmlFor="captcha"></label>
              <div
                className="preview-captcha w-full text-center h-10 tracking-widest border"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {captchaLetters.map((letter, index) => (
                  <span
                    key={index}
                    style={{
                      transform: `rotate(${letter.rotation}deg)`,
                      fontFamily: letter.font
                    }}
                  >
                    {letter.value}
                  </span>
                ))}
              </div>
              <div className="input-container mb-5">
                <input
                  type="text"
                  id="captcha-input"
                  className="input input-bordered w-full max-w-xs text-white"
                  placeholder="Enter Captcha text"
                  onChange={handleCaptchaInputChange}
                />
                <button
                  className="hover:bg-primary-400 text-white bg-primary-300 rounded-xl"
                  onClick={generateCaptcha}
                >
                  <i className="fa-solid fa-refresh"></i>
                </button>
              </div>
            </div>
            <button
              className="btn w-full hover:bg-primary-400 text-white bg-primary-300 "
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
