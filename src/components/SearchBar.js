import { motion } from "framer-motion";
import { Input, Button } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Load search history from localStorage on mount
  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setSearchHistory(storedHistory);
  }, []);

  // Save search to history
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const updatedHistory = [
        searchTerm,
        ...searchHistory.filter((item) => item !== searchTerm),
      ].slice(0, 5); // Limit to 5 recent searches
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchTerm("");
      setIsFocused(false);
    }
  };

  // Handle clicking a recent search
  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
    setIsFocused(true);
  };

  // Clear all search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative w-full max-w-screen-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
        }}
        whileTap={{ scale: 0.98 }}
      >
        <form onSubmit={handleSearch}>
          <Input
            placeholder="Search for products"
            prefix={<SearchOutlined className="text-gray-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="h-12 w-full rounded-md border border-gray-300 bg-white text-sm placeholder-gray-950 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
            aria-label="Search products"
            allowClear
          />
        </form>
      </motion.div>

      {/* Search History Dropdown */}
      {searchHistory.length > 0 && isFocused && (
        <motion.div
          className="absolute top-14 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              Search History
            </span>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={clearHistory}
              className="text-gray-500 hover:text-red-500"
              aria-label="Clear all search history"
            >
              Clear All
            </Button>
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {searchHistory.map((item, index) => (
              <motion.li
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer"
                onClick={() => handleRecentSearchClick(item)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                role="option"
                aria-selected="false"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
