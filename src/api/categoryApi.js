import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => {
    return axiosClient.get("/api/categories");
  },
};

export default categoryApi;
