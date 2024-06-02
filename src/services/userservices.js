import axiosInstance from "../config/axios/axios";

export const getUser = (id) => axiosInstance.get("users/profile/{id}");

export const updateUser = (id, params) =>
  axiosInstance.put(`users/update/${id}`, params);

export const getUserOrders = (id) => axiosInstance.get(`users/orders/${id}`);

export const addtoFavorites = (userId, mealId, params) =>
  axiosInstance.post(`users/${userId}/favourites/${mealId}`, params);

export const removefromFavorites = (userId, mealId) =>
  axiosInstance.delete(`users/${userId}/favourites/${mealId}`);

export const getFavorites = (userId) =>
  axiosInstance.get(`users/${userId}favourites`);
