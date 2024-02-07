import { Outlet, Link } from "react-router-dom";
import "./layout.css";
export const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link className="navbar-text" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="calculator">
              Calculator
            </Link>
          </li>
          <li>
            <Link className="navbar-text" to="login">
              Login
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
