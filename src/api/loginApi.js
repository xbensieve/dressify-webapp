import axios from "axios";
const API_URL = "http://localhost:5000/api/users";
const loginApi = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw { message: "Network or server error" };
    }
  }
};

export default loginApi;
