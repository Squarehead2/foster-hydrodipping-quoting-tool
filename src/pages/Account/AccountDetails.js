import React, { use, useEffect, useState } from "react"
import './AccountDetails.css';
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
        navigate("/");  // Redirect to home page after successful logout
        console.log("User signed out");
    };

    const handleChangeName = () => {
        const newName = prompt("Enter new name");
        updateProfile(auth.currentUser, {
            displayName: newName,
        })
        setDisplayName(newName);
    }

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
    }

    return(
        <div className="p-8 bg-gray-500 mx-40 max-h-full rounded">
            {currentUser ? (
                <div className="p-1 rounded">
                    <div className="flex items-center justify-between m-4 p-2 bg-primary-300 rounded">
                        <div className="bg-neutral text-neutral-content rounded-full w-12 flex items-center justify-center p-3">
                            <span className="text-3xs text-white">{firstLetter}</span>
                        </div>
                        <p className="ml-2 flex-grow text-slate-50">Name: {displayName}</p>
                        <button onClick={handleChangeName} className="border border-black rounded text-white bg-stone-600 hover:bg-primary-400 hover:text-white ">Change Name</button>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col border border- m-2 border-black p-2">
                            <button onClick={() => setSelectedTab("email")} className={selectedTab === "email" ? "text-blue-950" : ""}>Email</button>
                            <button onClick={() => setSelectedTab("password")} className={selectedTab === "password" ? "text-blue-950" : ""} >Password</button>
                            <button onClick={handleLogout} className="mt-10 hover:bg-primary-300 hover:text-white rounded">Logout</button>
                        </div>
                        {selectedTab === "email" && (
                            <div className="border border-black m-2 flex flex-col p-2">
                                <p className="text-3xl">Current Email:</p>
                                <p className="text-2xl border border-black rounded p-2 m-1">{email}</p>
                                <button onClick={handleChangeEmail} className="border border-black m-2 rounded hover:bg-primary-300 hover:text-white">Change Email</button>
                            </div>
                        )}
                        {selectedTab === "password" && (
                            <div className="border border-black m-2">
                                <div className="m-2 p-2">
                                    <button onClick={handleChangePassword} className="border border-black m-2 rounded hover:bg-primary-300 hover:text-white" >Change Password</button>
                                    {message && <p className="text-sky-500">{message}</p>}
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
    )
}