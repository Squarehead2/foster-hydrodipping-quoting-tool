import { Layout } from "./Layout";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./Home/Home";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Blog from "./Blog/blog";
import InStockDesigns from "./InStockDesigns/instockdesigns";
import NewestDesigns from "./NewestDesigns/newestdesigns";
import RecentWorks from "./RecentWorks/recentworks";
import { Calculator } from "./pages/Calculator/Calculator";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { AccountDetails } from "./pages/Account/AccountDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="instockdesigns" element={<InStockDesigns />} />
          <Route path="newestdesigns" element={<NewestDesigns />} />
          <Route path="recentworks" element={<RecentWorks />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<AccountDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
