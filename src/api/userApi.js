import axiosClient from "./axiosClient";

const userApi = {
  getUser: async () => {
    try {
      const response = await axiosClient.get(`/api/users/me`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
};

export default userApi;
