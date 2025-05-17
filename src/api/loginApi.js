import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

const loginApi = {
  login: async (credentials) => {
    const response = await axiosClient.post("/api/users/login", credentials);
    const { access_token, refresh_token } = response.data;

    // Store tokens in cookies
    Cookies.set("access_token", access_token, {
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("refresh_token", refresh_token, {
      secure: true,
      sameSite: "strict",
    });

    return response;
  },
  register: async (data) => {
    const payload = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      phone: data.phone,
      email: data.email,
      role: "customer",
      dob: data.dob,
    };
    const response = await axiosClient.post("/api/users/register", payload);
    return response;
  },
  logout: () => {
    // Clear tokens
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  },
};

const loginWithGoogle = async (token) => {
  const response = await axiosClient.post("/api/users/login-google", { token });
  const { access_token, refresh_token } = response.data;

  // Store tokens in cookies
  Cookies.set("access_token", access_token, {
    secure: true,
    sameSite: "strict",
  });
  Cookies.set("refresh_token", refresh_token, {
    secure: true,
    sameSite: "strict",
  });

  return response;
};

export { loginApi, loginWithGoogle };
