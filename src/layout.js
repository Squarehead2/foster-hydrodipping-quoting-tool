import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import {
  auth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "../src/_utils/firebase";
import firstLetterEmail from "../src/_utils/firstLetterEmail";
import { useEffect, useState } from "react";

// Define the Layout component
export const Layout = () => {
  // State variables to manage the current user and the first letter of their email
  const [currentUser, setCurrentUser] = useState();
  const [firstLetter, setFirstLetter] = useState("");

  // useEffect to update the firstLetter when the currentUser changes
  useEffect(() => {
    setFirstLetter(firstLetterEmail(currentUser?.email));
    console.log(currentUser?.email);
  }, [currentUser]);

  // useEffect to subscribe to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = () => {
    signOut(auth);
  };

  // JSX for the layout
  return (
    <>
      {/* Navigation bar */}
      <div className="navbar bg-base-100">
        {/* Left side of the navbar */}
        <div className="navbar-start">
          {/* Dropdown menu */}
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            {/* Dropdown content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Navigation links */}
              <li>
                <Link className="navbar-text" to="/">
                  Home
                </Link>
              </li>
              <li><Link className="navbar-text" to="blog">Blog</Link></li>
              <li><Link className="navbar-text" to="instockdesigns">In Stock Designs</Link></li>
              <li><Link className="navbar-text" to="newestdesigns">Newest Designs</Link></li>
              <li><Link className="navbar-text" to="recentworks">Recent Works</Link></li>
              <li><Link className="navbar-text" to="calculator">Calculator</Link></li>
              <li><Link className="navbar-text" to="register">Register</Link></li>
              <li><Link className="navbar-text" to="login">Login</Link></li>
              <li><Link className="navbar-text" to="account">Account</Link></li>
              <li><Link className="navbar-text" to="about">About</Link></li>
              <li><Link className="navbar-text" to="admin">Admin</Link></li>
              {/* ... (other navigation links) ... */}
            </ul>
          </div>
        </div>

        {/* Center of the navbar */}
        <div className="navbar-center">
          <Link className="btn btn-ghost text-xl" to="/">
            Foster Hydro Dipping
          </Link>
        </div>

        {/* Right side of the navbar */}
        <div className="navbar-end">
          {/* Icon link */}
          <Link className="btn btn-ghost btn-circle" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {/* Conditional rendering based on user authentication */}
          {currentUser ? (
            <div className="dropdown dropdown-bottom dropdown-end avatar placeholder">
              {/* User avatar */}
              <div
                tabIndex={0}
                role="button"
                className="bg-neutral text-neutral-content rounded-full w-10 "
              >
                <span className="text-3xs">{firstLetter}</span>
              </div>
              {/* Dropdown content for authenticated user */}
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="account" className="navbar-text">
                    Account
                  </Link>
                </li>
                <li>
                  {/* Logout button */}
                  <button
                    className="navbar-text"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-ghost" to="login">
              Login
            </Link>
            
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};
