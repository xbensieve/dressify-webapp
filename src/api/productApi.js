import axiosClient from "./axiosClient.js";
import { LRUCache } from "lru-cache";
import axios from "axios";
import config from "../config.js";

const cache = new LRUCache({
  max: 100,
  ttl: 5 * 60 * 1000,
  ttlAutopurge: true,
});

const loadCacheFromStorage = () => {
  try {
    const stored = localStorage.getItem("product_search_cache");
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([key, value]) => {
        cache.set(key, value);
      });
    }
  } catch (error) {
    console.warn("Failed to load cache from localStorage:", error.message);
  }
};

const saveCacheToStorage = () => {
  try {
    const cacheData = {};
    cache.forEach((value, key) => {
      cacheData[key] = value;
    });
    localStorage.setItem("product_search_cache", JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Failed to save cache to localStorage:", error.message);
  }
};

loadCacheFromStorage();

const searchProducts = async ({
  keyword = "", // Default to empty string
  minPrice = null, // No minimum price filter
  maxPrice = null, // No maximum price filter
  sortBy = "createdAt:desc", // Default sort by newest
  page = 1, // Default to first page
  limit = 10,
}) => {
  const cacheKey = `product_search_${keyword?.trim().toLowerCase() || ""}_${
    minPrice || ""
  }_${maxPrice || ""}_${sortBy || ""}_${page || ""}_${limit || ""}`;

  // Check if the result is in cache
  if (cache.has(cacheKey)) {
    console.log(`Cache hit for query: ${cacheKey}`);
    return cache.get(cacheKey);
  }

  try {
    // Build query string
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);
    if (sortBy) queryParams.append("sortBy", sortBy);
    if (page) queryParams.append("page", page);
    if (limit) queryParams.append("limit", limit);

    const response = await axiosClient.get(
      `/api/products/search?${queryParams.toString()}`
    );
    const data = response.data;

    // Store in cache
    cache.set(cacheKey, data);
    // Save updated cache to localStorage
    saveCacheToStorage();

    return data;
  } catch (error) {
    console.error("Error searching products:", error.message);
    throw error;
  }
};

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
    const response = await axiosClient.post("/api/products/id", { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching the product:", error.message);
    throw error;
  }
};

const productApi = { getProducts, getProductById, addProduct, searchProducts };
export default productApi;
