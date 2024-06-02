import { jwtDecode } from "jwt-decode";

export const isValidToken = (token) => {
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

export const setSession = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};

export const getTemporarySession = () => sessionStorage.getItem("token");

export const getSession = () => localStorage.getItem("token");

export const clearLocalStorage = () =>
  localStorage.removeItem("token", "x-extender-store", "orderList");

export const getAccessToken = () => {
  return getSession();
};
export const extenderStoreKey = "x-extender-store";
export const setExtenderStorage = ({ user, token }) => {
  const storageData = { user, token };
  if (token) {
    storageData.headers = { Authorization: `Bearer ${token}` };
  }
  localStorage.setItem(extenderStoreKey, JSON.stringify(storageData));
};

export const getExtenderStorage = () => localStorage.getItem(extenderStoreKey);
export const clearExtenderStorage = () =>
  localStorage.removeItem(extenderStoreKey);
