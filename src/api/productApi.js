import axiosClient from "./axiosClient.js";
import axios from "axios";
import config from "../config.js";

const addProduct = async (data) => {
  try {
    const response = await axiosClient.post("/api/products", data);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
};

const getProducts = async (page) => {
  try {
    const response = await axios.get(
      `${config.API_URL}/api/products?page=${page}&limit=12`
    );
    const { data, pagination } = response.data;
    return { products: data, pagination };
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const response = await axios.get(`${config.API_URL}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the product:", error.message);
    throw error;
  }
};

const productApi = { getProducts, getProductById, addProduct };
export default productApi;
