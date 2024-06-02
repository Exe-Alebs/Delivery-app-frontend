import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthenticated, setLoading, setUser } from "../../redux/auth";
import { RegisterAuth, loginAuth } from "../../services/authservice";
import { Toast } from "../../utils/toast/toast";
import {
  clearExtenderStorage,
  clearLocalStorage,
  getAccessToken,
  isValidToken,
  setExtenderStorage,
  setSession,
} from "../../utils/token/token";
import axiosInstance from "../axios/axios";
import { hideLoader, showLoader } from "../../utils/helpers/loader";

export const setAuthHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

const AuthContext = createContext({
  method: "JWT",
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginPageLoad, setLoginPageLoad] = React.useState(false);
  const [sessionAuthenticated, setSessionAuthenticated] = useState(false);

  const handleAuthSuccess = (user, token) => {
    console.log("handleAuthSuccess", user, token);
    dispatch(setLoading(false));
    setLoginPageLoad(false);
    dispatch(setUser(user));
    dispatch(setAuthenticated(true));
    setSession(token);
    setAuthHeader(token);
    setExtenderStorage({ user, token });
    setSessionAuthenticated(true);
  };

  const handleAuthFail = () => {
    dispatch(setLoading(false));
    dispatch(setAuthenticated(false));
    dispatch(setUser(null));
    setLoginPageLoad(true);
  };

  const login = ({ email, password }) => {
    setLoginPageLoad(true);
    setSessionAuthenticated(false);
    dispatch(setLoading(true));
    loginAuth({ email, password })
      .then((res) => {
        const { user, token } = res.data;

        handleAuthSuccess(user, token);
        Toast("success", `Welcome back! ${user?.email} 👋`);
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = `${err?.message ?? "Something went wrong!"} 🙁`;
        Toast("error", errorMessage);
        handleAuthFail();
      });
  };

  const register = ({ firstName, lastName, email, password }) => {
    setLoginPageLoad(true);
    setSessionAuthenticated(false);
    dispatch(setLoading(true));
    RegisterAuth({ firstName, email, password, lastName })
      .then((res) => {
        const { user, token } = res.data;
        handleAuthSuccess(user, token);
        Toast("success", `Welcome to Usl ${user?.name} `);
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = `${
          err?.message ?? err?.error ?? "Something went wrong!"
        } 🙁`;
        Toast("error", errorMessage);
        handleAuthFail();
      });
  };
  const logout = () => {
    setSession(null);
    setAuthHeader(null);
    clearExtenderStorage();
    clearLocalStorage();
    setSessionAuthenticated(false);
    dispatch(setAuthenticated(false));
    dispatch(setUser({}));
    navigate("/auth");
    Toast("success", "Logout Sucessful");
  };

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = getAccessToken();
    if (token && isValidToken(token)) {
      setAuthHeader(token);
    } else {
      dispatch(setLoading(false));
      dispatch(setAuthenticated(false));
    }
  }, []);
  useEffect(() => {
    // switch (loading || initializing) {
    switch (loading) {
      case true:
        showLoader();
        break;
      default:
        hideLoader();
    }
  }, [loading]);

  return (
    <AuthContext.Provider
      value={{
        method: "JWT",
        login,
        register,
        user,
        isAuthenticated,
        loading,
        logout,
        loginPageLoad,
        sessionAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
