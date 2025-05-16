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
