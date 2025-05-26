import axiosClient from "./axiosClient";
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 100,
  ttl: 5 * 60 * 1000,
  ttlAutopurge: true,
});

const LOCAL_STORAGE_KEY = "categoriesCache";

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      cache.set("all", parsed, { ttl: 5 * 60 * 1000 });
      return parsed;
    }
  } catch (e) {}
  return null;
}

function saveToLocalStorage(data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

const categoryApi = {
  getAll: async () => {
    let cached = cache.get("all");
    if (!cached) {
      cached = loadFromLocalStorage();
    }
    if (cached) {
      return Promise.resolve(cached);
    }
    const response = await axiosClient.get("/api/categories");
    cache.set("all", response, { ttl: 5 * 60 * 1000 });
    saveToLocalStorage(response);
    return response;
  },
};

export default categoryApi;
