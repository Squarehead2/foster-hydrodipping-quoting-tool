import React, { use, useEffect, useState } from "react"
import './AccountDetails.css';
import {
    auth,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut,
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
        navigate("/");
        console.log("User signed out");
    };

    return(
        <div>
            {currentUser ? (
                <div>
                    <p>Email: {email}</p>
                    <p>Name: {displayName}</p>
                    <button onClick={handleChangePassword} >Change Password</button>
                    <button onClick={handleLogout} >Logout</button>
                </div>
            ) : (
                <p>no user</p>
            )}
        </div>
    )
}