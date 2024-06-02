import axiosInstance from "../config/axios/axios";

export const getallmeals = () => axiosInstance.get("meals/all");

export const getMealbyId = (id) => axiosInstance.get(`/meals/${id}`);

//Admin routes
export const CreateMeal = (params) =>
  axiosInstance.post("meals/create", params);

export const UpdateMeal = (id, params) =>
  axiosInstance.put(`meals/update/${id}`, params);

export const DeleteMeal = (id) => axiosInstance.delete(`meals/delete/${id}`);
export const getAllMeals = (
  sortBy = "mealName",
  order = "asc",
  filterByType = ""
) =>
  axiosInstance.get(
    `meals/all?sortBy=${sortBy}&order=${order}&filterByType=${filterByType}`
  );
