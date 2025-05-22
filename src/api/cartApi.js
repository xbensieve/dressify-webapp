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
  updateCart: (productId, quantity) => {
    const url = `/api/carts/items/${productId}`;
    return axiosClient.put(url, quantity);
  },
  removeFromCart: (productId) => {
    const url = `/api/carts/${productId}`;
    return axiosClient.delete(url);
  },
  clearCart: () => {
    const url = "/api/carts/clear";
    return axiosClient.delete(url);
  },
  checkout: (paymentMethod) => {
    const url = "/cart/checkout";
    return axiosClient.post(url, { paymentMethod });
  },
  getCartCount: () => {
    const url = "/cart/count";
    return axiosClient.get(url);
  },
  getCartTotal: () => {
    const url = "/cart/total";
    return axiosClient.get(url);
  },
};
export default cartApi;
