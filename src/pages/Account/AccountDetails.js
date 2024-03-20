import React, { use, useEffect, useState } from "react";
import "./AccountDetails.css";
import {
  auth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  updateEmail,
} from "../../_utils/firebase";
import { useNavigate } from "react-router-dom";
import firstLetterEmail from "../../_utils/firstLetterEmail";

export const AccountDetails = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const [currentUser, setCurrentUser] = useState();
  const [firstLetter, setFirstLetter] = useState("");

  const [selectedTab, setSelectedTab] = useState("email");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (user) {
        setDisplayName(user.displayName);
        setEmail(user.email);
      }
    });
  }, []);

  if (displayName === null || displayName === "") {
    setDisplayName("User");
  }

  useEffect(() => {
    setFirstLetter(firstLetterEmail(currentUser?.email));
    console.log(currentUser?.email);
  }, [currentUser]);

  const handleChangePassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent");
        setMessage("Password reset email sent");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error.message);
        setErrorMessage("Error sending password reset email");
      });
  };

  const handleLogout = () => {
    signOut(auth);
    navigate("/"); // Redirect to home page after successful logout
    console.log("User signed out");
  };

  const handleChangeName = () => {
    const newName = prompt("Enter new name");
    updateProfile(auth.currentUser, {
      displayName: newName,
    });
    setDisplayName(newName);
  };

  const handleChangeEmail = () => {
    const newEmail = prompt("Enter new email");
    updateEmail(auth.currentUser, newEmail)
      .then(() => {
        console.log("Email updated");
      })
      .catch((error) => {
        console.error("Error updating email:", error.message);
      });
    setEmail(newEmail);
  };

  console.log(currentUser);

  return (
    <div className="p-8 bg-gray-500 mx-40 max-h-full rounded">
      {currentUser ? (
        <div className="p-1 rounded">
          <div className="flex items-center justify-between m-4 p-2 bg-primary-200 rounded">
            <div className="avatar flex items-center justify-center bg-primary-200">
              <div className="w-24 h-24 rounded-full relative text-white bg-primary-400 shadow-2xl">
                <p className="text-center text-6xl absolute mt-[1.30rem] ml-[1.25rem]">
                  {firstLetter}
                </p>
              </div>
            </div>
            <p className="ml-2 flex-grow text-slate-50">Name: {displayName}</p>
            <button
              onClick={handleChangeName}
              className="btn hover:bg-primary-300 bg-white"
            >
              Change Name
            </button>
          </div>
          <div className="flex">
            <div className="flex flex-col border border- m-2 border-black p-2">
              <button
                onClick={() => setSelectedTab("email")}
                className={selectedTab === "email" ? "text-blue-950" : ""}
              >
                Email
              </button>
              <button
                onClick={() => setSelectedTab("password")}
                className={selectedTab === "password" ? "text-blue-950" : ""}
              >
                Password
              </button>
              <button
                onClick={handleLogout}
                className="mt-10 hover:bg-primary-300 hover:text-white rounded"
              >
                Logout
              </button>
            </div>
            {selectedTab === "email" && (
              <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Current Email: </h2>
                  <div className="stat">
                    <div className="stat-value font-normal shadow-md bg-primary-50  p-2 rounded-md">
                      {email}
                    </div>
                  </div>
                  <div className="w-full">
                    <button onClick={handleChangeEmail} className="btn w-full">
                      Change Email
                    </button>
                  </div>
                </div>
              </div>
            )}
            {selectedTab === "password" && (
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex flex-row justify-center items-center">
                    <h2 className="card-title text-center">Change Password</h2>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <div className="m-2 p-2">
                      {message && (
                        <p className="text-sm text-center text-primary-300">
                          {message}
                        </p>
                      )}
                      {errorMessage && (
                        <p className="text-sm text-center text-red-500">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <button
                      onClick={handleChangePassword}
                      className=" btn w-full"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>no user</p>
        </div>
      )}
    </div>
  );
};
