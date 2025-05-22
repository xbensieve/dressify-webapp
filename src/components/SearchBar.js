import { motion } from "framer-motion";
import { Input, Button } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);

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
      setSearchTerm(""); // Clear input after search
      setIsFocused(false); // Hide dropdown
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
      console.log("Searching for:", searchTerm); // Placeholder for actual search logic
    }
  };

  // Handle clicking a recent search
  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
    setIsFocused(false); // Hide dropdown after selection
    // Programmatically submit the form
    if (formRef.current) {
      const event = new Event("submit", { cancelable: true });
      formRef.current.dispatchEvent(event);
    }
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
        <form ref={formRef} onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search for products"
            prefix={<SearchOutlined className="text-gray-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="h-10 w-full rounded-md border border-gray-300 bg-white text-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            aria-label="Search products"
            allowClear
          />
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 px-4 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-medium rounded-md border-none hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-800 focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 focus:ring-offset-white transition-all duration-200 shadow-sm hover:shadow-md"
            icon={<SearchOutlined className="mr-1.5 text-base" />}
          >
            Search
          </Button>
        </form>
      </motion.div>
      {/* Search History Dropdown */}
      {searchHistory.length > 0 && isFocused && (
        <motion.div
          className="absolute top-12 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
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
              onMouseDown={clearHistory} // Changed from onClick to onMouseDown
              className="text-gray-500 hover:text-red-500 text-sm"
              aria-label="Clear all search history"
            >
              Clear All
            </Button>
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {searchHistory.map((search, index) => (
              <motion.li
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors duration-150"
                onMouseDown={() => handleRecentSearchClick(search)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
                role="option"
                aria-selected="false"
              >
                {search}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
