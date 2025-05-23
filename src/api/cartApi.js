import axiosClient from "./axiosClient";

const cartApi = {
  getCart: () => {
    const url = "/api/carts/items";
    return axiosClient.get(url);
  },
  addToCart: (productId, variationId, quantity) => {
    const url = "/api/carts/items";
    return axiosClient.post(url, { productId, variationId, quantity });
  },
};
export default cartApi;
