import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import useAuth from "../config/hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = (path) => () => {
    navigate(path);
  };
  return (
    <nav className="nav">
      <h1 onClick={handleNavigate("/")}>Foodie</h1>
      {isAuthenticated ? (
        <ul>
          <li>
            <Link to="/contact">Contact-Us</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/orders">Order</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/contact">Contact-Us</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
