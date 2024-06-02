import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material"; // Import the shopping cart icon from Material-UI
import "./navbar.scss";
import useAuth from "../config/hooks/useAuth";
import { useMealContext } from "../config/context/MealContext"; // Import the useMealContext hook

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { orderList } = useMealContext(); // Access the orderList from the context
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
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/">
              Logout
            </Link>
          </li>
          <li className="order-counter">
            <Link to="/orders">
              <ShoppingCart />
              <span className="order-count">{orderList.length}</span>{" "}
              {/* Display the count */}
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
          <li className="order-counter">
            <Link to="/orders">
              <ShoppingCart />
              <span className="order-count">{orderList.length}</span>{" "}
              {/* Display the count */}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
