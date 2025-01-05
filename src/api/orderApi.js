import axios from "axios";
import config from "../config.js";
/**
 * Creates a new order by sending the provided form data to the API.
 *
 * @param {Object} formData - The data to be sent to create a new order.
 * @returns {Promise<Object>} - The response data containing the created order details.
 * @throws {Error} - Throws an error if the API call fails.
 */
const createOrder = async (formData) => {
  try {
    const response = await axios.post(`${config.API_URL}/api/orders`, formData);
    return response.data;
  } catch (error) {
    console.error("Error occurred while creating the order:", error.message);
    throw new Error(
      `Failed to create order: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

export default createOrder;
