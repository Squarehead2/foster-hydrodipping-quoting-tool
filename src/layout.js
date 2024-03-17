import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import { auth, onAuthStateChanged, signOut } from "./_utils/firebase";
import firstLetterEmail from "./_utils/firstLetterEmail";
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
      <div className="navbar bg-primary-300">
        {/* Left side of the navbar */}
        <div className="navbar-start ">
          {/* Dropdown menu */}
          <div className="dropdown ">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 bg-primary-400 flex border-1 border-solid border-purple-400 justify-center items-center"
            >
              {/* Navigation links */}
              <li className="flex justify-center items-center">
                <Link className="text-[20px] hover:text-primary-200" to="/">
                  Home
                </Link>
              </li>
              <li className="flex justify-center align-center">
                <Link className="text-[20px] hover:text-primary-200" to="blog">
                  Blog
                </Link>
              </li>
              <li className="flex justify-center align-center">
                <Link
                  className="text-[20px] hover:text-primary-200 text-center"
                  to="instockdesigns"
                >
                  In Stock Designs
                </Link>
              </li>
              <li className="flex justify-center items-center">
                <Link
                  className="text-[20px] hover:text-primary-200 text-center"
                  to="newestdesigns"
                >
                  Newest Designs
                </Link>
              </li>
              <li className="flex justify-center items-center">
                <Link
                  className="text-[20px] hover:text-primary-200 text-center"
                  to="recentworks"
                >
                  Recent Works
                </Link>
              </li>
              <li className="flex justify-center align-center">
                <Link
                  className="text-[20px] hover:text-primary-200"
                  to="calculator"
                >
                  Calculator
                </Link>
              </li>

              {!currentUser ? (
                <>
                  <li className="flex justify-center align-center">
                    <Link
                      className="text-[20px] hover:text-primary-200"
                      to="login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="flex justify-center align-center">
                    <Link
                      className="text-[20px] hover:text-primary-200"
                      to="register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="flex justify-center align-center">
                  <Link
                    className="text-[20px] hover:text-primary-200"
                    to="account"
                  >
                    Account
                  </Link>
                </li>
              )}
              <li className="flex justify-center align-center">
                <Link className="text-[20px] hover:text-primary-200" to="admin">
                  Admin
                </Link>
              </li>
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
          {/* Conditional rendering based on user authentication */}
          {currentUser ? (
            <div className="dropdown dropdown-bottom dropdown-end avatar placeholder ">
              {/* User avatar */}
              <div
                tabIndex={0}
                role="button"
                className="bg-neutral text-neutral-content rounded-full w-12 "
              >
                <span className="text-3xs">{firstLetter}</span>
              </div>
              {/* Dropdown content for authenticated user */}
              <ul className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-52 bg-primary-400">
                <li className="flex justify-center align-center">
                  <Link
                    to="account"
                    className="text-[20px] hover:text-primary-200"
                  >
                    Account
                  </Link>
                </li>
                <li className="flex justify-center align-center">
                  {/* Logout button */}
                  <button
                    className="text-[20px] text-white hover:text-primary-200"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
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
