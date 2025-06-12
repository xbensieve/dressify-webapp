import axios from "axios";
import config from "../config.js";
import axiosClient from "./axiosClient";

const orderApi = {
  getOrdersByUser: async (page, limit) => {
    try {
      const url = "/api/orders";
      const response = await axiosClient.get(
        `${url}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error occurred while fetching user orders:",
        error.message
      );
      throw new Error(
        `Failed to fetch user orders: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
  createOrder: async (payload) => {
    try {
      const url = "/api/orders/";
      const response = await axiosClient.post(`${url}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error occurred while creating the order:", error.message);
      throw new Error(
        `Failed to create order: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
  createOrderByCart: async (payload) => {
    try {
      const url = "/api/orders/from-cart";
      const response = await axiosClient.post(`${url}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error occurred while creating the order:", error.message);
      throw new Error(
        `Failed to create order: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
  createPaymentUrl: async (orderId) => {
    try {
      const url = "/api/vnpay/generate-payment-url";
      const response = await axiosClient.post(`${url}`, { orderId });
      return response.data;
    } catch (error) {
      console.error(
        "Error occurred while creating payment URL:",
        error.message
      );
      throw new Error(
        `Failed to create payment URL: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  },
};

export default orderApi;
