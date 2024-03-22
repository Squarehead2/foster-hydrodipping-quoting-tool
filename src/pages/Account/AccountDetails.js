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
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [modalType, setModalType] = useState("");

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
    setModalType("Change Name");
    document.getElementById("my_modal_5").showModal();

    // updateProfile(auth.currentUser, {
    //   displayName: newName,
    // });
    // setDisplayName(newName);
  };

  const handleNewName = () => {
    if (newName === "") {
      return;
    }
    updateProfile(auth.currentUser, {
      displayName: newName,
    });
    setDisplayName(newName);
  };

  const handleChangeEmail = () => {
    setModalType("Change Email");

    document.getElementById("my_modal_5").showModal();
  };
  const handleNewEmail = () => {
    if (newEmail === "") {
      return;
    }
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
    <>
      <div className="p-8 bg-gray-500 mx-40 max-h-full rounded">
        {currentUser ? (
          <div className="p-1 rounded">
            <div className="flex items-center justify-between m-4 p-4 bg-primary-200 rounded">
              <div className="avatar flex items-center justify-center bg-primary-200">
                <div className="w-24 h-24 rounded-full relative text-white bg-primary-400 shadow-2xl">
                  <p className="text-center text-6xl absolute mt-[1.30rem] ml-[1.25rem]">
                    {firstLetter}
                  </p>
                </div>
              </div>
              <p className="ml-2 flex-grow text-slate-50">
                Name: {displayName}
              </p>
              <button
                onClick={handleChangeName}
                className="btn hover:bg-primary-300 bg-white border-none mr-4"
              >
                Change Name
              </button>
            </div>
            <div className="flex">
              <div className="card flex flex-col shadow-xl m-2 p-2">
                <button
                  onClick={() => setSelectedTab("email")}
                  className={`btn my-2 ${
                    selectedTab === "email" ? "bg-primary-300 text-white" : ""
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setSelectedTab("password")}
                  className={`btn my-2 ${
                    selectedTab === "password"
                      ? "bg-primary-300 text-white"
                      : ""
                  }`}
                >
                  Password
                </button>
                <button
                  onClick={handleLogout}
                  className="mt-10 hover:bg-primary-300 hover:text-white rounded btn"
                >
                  Logout
                </button>
              </div>
              <div className="flex justify-center items-center">
                {selectedTab === "email" && (
                  <div className="card w-full bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">Current Email: </h2>
                      <div className="stat text-center">
                        <div className="stat-value font-normal shadow-md bg-primary-50  p-2 rounded-md">
                          {email}
                        </div>
                      </div>
                      <div className="w-full">
                        <button
                          onClick={handleChangeEmail}
                          className="btn w-full"
                        >
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
                        <h2 className="card-title text-center">
                          Change Password
                        </h2>
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
          </div>
        ) : (
          <div>
            <p>no user</p>
          </div>
        )}
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalType}</h3>
          <div className="mt-10">
            <input
              type={modalType === "Change Email" ? "email" : "text"}
              placeholder={`${
                modalType === "Change Name" ? "New Name" : "New Email"
              }`} // if modalType is Change Name, placeholder is New Name, else New Email
              className="input input-bordered w-full"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </div>
          <div className="modal-action">
            <form method="dialog ">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn hover:bg-red-500 hover:text-white">
                Close
              </button>
              <button
                className="btn ml-2 hover:bg-primary-300 bg-primary-200 text-white"
                onClick={() => {
                  if (modalType === "Change Name") {
                    handleNewName();
                  } else if (modalType === "Change Email") {
                    handleNewEmail();
                  }
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
