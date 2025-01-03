import axios from "axios";

// Configuration for the base API URL and request timeout
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const TIMEOUT = 10000; // 10 seconds timeout

// Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for handling authorization errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific HTTP status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - possibly handle token expiration or login failure
          // Redirect to login page or refresh token logic
          break;
        case 500:
          // Internal server error
          console.error("Server error: ", error.response.data);
          break;
        default:
          console.error("API error: ", error.response.data);
      }
      throw error.response.data;
    } else if (error.request) {
      // Request was made but no response was received
      throw { message: "No response from server" };
    } else {
      // Error in setting up the request
      throw { message: `Request Error: ${error.message}` };
    }
  }
);

const loginApi = async (username, password) => {
  try {
    const response = await axiosInstance.post("/api/users/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default loginApi;
