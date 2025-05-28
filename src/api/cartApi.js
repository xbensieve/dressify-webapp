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
  updateCartItem: (itemId, quantity) => {
    const url = `api/carts/items/${itemId}`;
    return axiosClient.put(url, { quantity });
  },
  removeCartItem: (itemId) => {
    const url = `api/carts/items/${itemId}`;
    return axiosClient.delete(url);
  },
};
export default cartApi;
