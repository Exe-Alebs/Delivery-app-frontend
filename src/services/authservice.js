import axiosInstance from "./../config/axios/axios";

export const loginAuth = (params) => axiosInstance.post("auth/login", params);
export const RegisterAuth = (params) =>
  axiosInstance.post("auth/signup", params);

export const getUser = (id) => axiosInstance.get("users/{id}");
