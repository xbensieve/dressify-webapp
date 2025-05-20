import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    console.log("Access Token:", token ? "Present" : "Missing");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.config.url !== "/api/users/refresh-token"
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        console.log("Attempting token refresh with:", refreshToken);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/users/refresh-token`,
          { refresh_token: refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );
        const { access_token } = response.data;
        console.log("New access token:", access_token);
        Cookies.set("access_token", access_token, {
          secure: true,
          sameSite: "strict",
        });
        processQueue(null, access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Refresh token error:", err.message);
        processQueue(err, null);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        message.error("Session expired, please log in again.");
        return Promise.reject(
          new Error("Session expired, please log in again")
        );
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
