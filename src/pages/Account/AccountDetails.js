import React, { use, useEffect, useState } from "react"
import './AccountDetails.css';
import {
    auth,
    onAuthStateChanged,
} from "../../_utils/firebase";

export const AccountDetails = () => {

    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");

    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            if (user) {
                setDisplayName(user.displayName || "");
            } else {
                setDisplayName("");
            }
        });
    }, []);

    console.log(displayName);

    return(
        <div>
            {currentUser ? (
                <div>
                    <p>{displayName}</p>
                </div>
            ) : (
                <p>no user</p>
            )}
        </div>
    )
}