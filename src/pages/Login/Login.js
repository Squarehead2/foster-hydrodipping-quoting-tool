"use client";

import React, { useState } from "react";

export const Login = () =>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e){
        e.preventDefault();
    }

    return(
        <div className="login">
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input 
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}