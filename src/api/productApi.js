import axios from "axios";
import config from "../config.js";
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
export default { getProducts, getProductById };
