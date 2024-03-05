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

export const AccountDetails = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    const [currentUser, setCurrentUser] = useState();

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
        <div>
            {currentUser ? (
                <div>
                    <p>Email: {email}</p> 
                    <p>Name: {displayName}</p> <button onClick={handleChangeName} >Change Name</button>
                    <button onClick={handleChangePassword} >Change Password</button>
                    <button onClick={handleLogout} >Logout</button>
                </div>
            ) : (
                <p>no user</p>
            )}
        </div>
    )
}