import axios from "axios";
import config from "../config.js";
/**
 * Generates a payment URL for the specified order ID using the VNPay API.
 *
 * @param {string} orderId - The ID of the order for which payment URL is being created.
 * @returns {Promise<string>} - The payment URL.
 * @throws {Error} - Throws an error if the API call fails.
 */
const createPayment = async (orderId) => {
  try {
    const response = await axios.post(
      `${config.API_URL}/api/vnpay/generate-payment-url`,
      {
        orderId: orderId,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while generating the payment URL:",
      error.message
    );
    throw new Error(
      `Failed to create payment URL: ${
        error.response?.data?.message || error.message
      }`
    );
  }
};

export default createPayment;
