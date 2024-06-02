import axiosInstance from "../config/axios/axios";

export const CreateFeedbakck = (params) =>
  axiosInstance.post("feedback/create", params);

//Admin routes

export const getFeedback = (feedbackId) =>
  axiosInstance.get(`feedback/${feedbackId}`);

export const getAllFeedbacks = () => axiosInstance.get("feedback/all");
