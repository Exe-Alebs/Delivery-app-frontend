import axiosInstance from "../config/axios/axios";

export const CreateOrder = (params) =>
  axiosInstance.post("orders/create", params);

export const getOrderDetails = (orderId) =>
  axiosInstance.get(`orders/${orderId}`);

export const getOrderbyUser = (userId) =>
  axiosInstance.get(`orders/user/${userId}`);

//Admin routes
export const getAllOrders = () => axiosInstance.get("orders/all");
