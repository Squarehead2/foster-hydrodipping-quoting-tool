import { Outlet, Link } from "react-router-dom";
import "./layout.css";

export const Layout = () => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link className="navbar-text" to="/">Home</Link></li>
              <li><Link className="navbar-text" to="blog">Blog</Link></li>
              <li><Link className="navbar-text" to="instockdesigns">In Stock Designs</Link></li>
              <li><Link className="navbar-text" to="newestdesigns">Newest Designs</Link></li>
              <li><Link className="navbar-text" to="recentworks">Recent Works</Link></li>
              <li><Link className="navbar-text" to="calculator">Calculator</Link></li>
              <li><Link className="navbar-text" to="register">Register</Link></li>
              <li><Link className="navbar-text" to="login">Login</Link></li>
              <li><Link className="navbar-text" to="account">Account</Link></li>
              <li><Link className="navbar-text" to="about">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost text-xl" to="/">Foster Hydro Dipping</Link>
        </div>
        <div className="navbar-end">
          <Link className="btn btn-ghost btn-circle" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </Link>
          <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-10">
                <span class="text-3xs">M</span>
              </div>
</div>
        </div>
      </div>

      <Outlet />
    </>
  );
};
