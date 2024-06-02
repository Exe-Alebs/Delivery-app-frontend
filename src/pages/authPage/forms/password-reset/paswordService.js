import axiosInstance from "../../../../config/axios/axios";

export const SendResetLink = (email) =>
  axiosInstance.post("/auth/user/forgot", { email });
export const ResetPassword = (password, token) =>
  axiosInstance.put(`/auth/user/update/${token}`, { password });
