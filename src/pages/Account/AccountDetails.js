import React, { use, useEffect, useState } from "react"
import './AccountDetails.css';
import {
    auth,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "../../_utils/firebase";

export const AccountDetails = () => {

    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    const [currentUser, setCurrentUser] = useState();

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

    return(
        <div>
            {currentUser ? (
                <div>
                    <p>Email: {email}</p>
                    <p>Name: {displayName}</p>
                    <button onClick={handleChangePassword} >Change Password</button>
                </div>
            ) : (
                <p>no user</p>
            )}
        </div>
    )
}