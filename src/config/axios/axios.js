import axios from "axios";
import { createBrowserHistory } from "history";
import { getAccessToken, isValidToken } from "../../utils/token/token";
import axiosCache from "./axiosCache";

const history = createBrowserHistory();

const baseURL = "http://localhost:8080/api/v1/";

const axiosInstance = axios.create({
  baseURL,
  adapter: axiosCache.defaults.adapter,
});

axiosInstance.defaults.headers["content-type"] = "application/json";
const accessToken = getAccessToken();

axiosInstance.interceptors.request.use((req) => {
  if (isValidToken(accessToken)) {
    return req;
  }

  return req;
});

axiosInstance.defaults.headers.common.Authorization = `Bearer ${getAccessToken()}`;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || {
        message: "Something went wrong!",
        error,
      }
    )
);

export default axiosInstance;
