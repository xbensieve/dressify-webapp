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
  createAddress: async (payload) => {
    try {
      const url = "/api/addresses";
      const response = await axiosClient.post(`${url}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },
  setDefaultAddress: async (addressId) => {
    try {
      const url = `/api/addresses/${addressId}/default`;
      const response = await axiosClient.patch(url);
      return response.data;
    } catch (error) {
      console.error("Error setting default address:", error);
      throw error;
    }
  },
  editAddress: async (addressId, payload) => {
    try {
      const url = `/api/addresses/${addressId}`;
      const response = await axiosClient.put(url, payload);
      return response.data;
    } catch (error) {
      console.error("Error editing address:", error);
      throw error;
    }
  },
  deleteAddress: async (addressId) => {
    try {
      const url = `/api/addresses/${addressId}`;
      const response = await axiosClient.delete(url);
      return response.data;
    } catch (error) {
      console.error("Error deleting address:", error);
      throw error;
    }
  },
};

export default userApi;
