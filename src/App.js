import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./utils/toast/toast.css";
import "react-toastify/dist/ReactToastify.css";
import "rodal/lib/rodal.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./config/context/JWTAuthContext";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MenuPage from "./pages/MenuPage";
import MealPage from "./pages/MealPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";
import OrdersPage from "./pages/OrdersPage";
import ProtectedRoute from "./router/protectedRoute";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <AuthProvider>
          <Navbar />
          <div
            style={{
              height: "100%",
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/meal/:id" element={<MealPage />} />
              <Route
                path="/profile"
                element={<ProtectedRoute component={ProfilePage} />}
              />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/orders"
                element={<ProtectedRoute component={OrdersPage} />}
              />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
