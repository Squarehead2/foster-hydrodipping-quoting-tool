import { Outlet, Link } from "react-router-dom";
import "./layout.css";
export const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="menu">
          <li className="logo">Foster Hydro Dipping</li>
          <li>
            <Link className="navbar-text" to="/">
              HOME
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="about">
              NEWEST DESIGNS
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="about">
              IN STOCK DESIGNS
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="about">
              RECENT WORKS
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="about">
              BLOG
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="calculator">
              CALCULATOR
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="login">
              LOGIN
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="account">
              ACCOUNT
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
