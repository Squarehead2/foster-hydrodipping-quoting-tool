import React, { use, useEffect, useState } from "react"
import './AccountDetails.css';
import {
    auth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
} from "../../_utils/firebase";
import { useNavigate } from "react-router-dom";
import firstLetterEmail from "../../_utils/firstLetterEmail";


export const AccountDetails = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    const [currentUser, setCurrentUser] = useState();
    const [firstLetter, setFirstLetter] = useState("");

    const [selectedTab, setSelectedTab] = useState("email");

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            if (user) {
                setDisplayName(user.displayName || "");
                setEmail(user.email || "");
            } else {
                setDisplayName("");
                setEmail("");
            }
        });
    }, []);

    useEffect(() => {
        setFirstLetter(firstLetterEmail(currentUser?.email));
        console.log(currentUser?.email);
      }, [currentUser]);

    if (displayName === "") {
        setDisplayName("name");
    }

    console.log(displayName);

    const handleChangePassword = () => {
        sendPasswordResetEmail(auth, email)
          .then(() => {
            console.log("Password reset email sent");
            alert("Password reset email sent");
          })
          .catch((error) => {
            console.error("Error sending password reset email:", error.message);
            alert("Error sending password reset email");
          });
    };

    const handleLogout = () => {
        auth.signOut();
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

    return(
        <div className="p-8 bg-gray-500 mx-40 max-h-full">
            {currentUser ? (
                <div>
                    <div className="flex items-center m-4 p-10">
                        <div className="bg-neutral text-neutral-content rounded-full w-12 flex items-center justify-center p-3">
                            <span className="text-3xs">{firstLetter}</span>
                        </div>
                        <p className="ml-2">display name: {displayName}</p>
                        <button onClick={handleChangeName} >Change Name</button>
                    </div>
                    <div>
                        <button onClick={() => setSelectedTab("email")}>Email</button>
                        <button onClick={() => setSelectedTab("password")} >Password</button>
                    </div>
                    {selectedTab === "email" && (
                        <div>
                            <p>Email: {email}</p>
                            <button>Change Email</button>
                        </div>
                    )}
                    {selectedTab === "password" && (
                        <div>
                            <button onClick={handleChangePassword} >Change Password</button>
                        </div>
                    )}
                </div>
                    
            ) : (
                <div>
                    <p>no user</p>
                </div>
            )}
        </div>
    )
}