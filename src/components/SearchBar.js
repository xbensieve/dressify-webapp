import { motion, AnimatePresence } from "framer-motion";
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

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    );
    setSearchHistory(storedHistory);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const updatedHistory = [
        searchTerm,
        ...searchHistory.filter((item) => item !== searchTerm),
      ].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchTerm("");
      setIsFocused(false);
      navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
    setIsFocused(false);
    if (formRef.current) {
      const event = new Event("submit", { cancelable: true });
      formRef.current.dispatchEvent(event);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="relative w-full max-w-screen-md mx-auto z-50">
      <AnimatePresence>
        {isFocused && (
          <motion.div
            key="blur-background"
            className="fixed inset-0 bg-white/30 backdrop-blur-sm z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10"
      >
        <form
          ref={formRef}
          onSubmit={handleSearch}
          className="flex flex-col relative"
        >
          <Input
            placeholder="Search for products"
            prefix={<SearchOutlined className="text-gray-500" />}
            suffix={
              <Button
                type="text"
                htmlType="submit"
                icon={<SearchOutlined />}
                className="text-purple-700 hover:text-purple-900"
              />
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="h-12 w-full rounded-full border border-gray-300 bg-white text-sm placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 shadow-md"
            allowClear
          />
        </form>
      </motion.div>
      {searchHistory.length > 0 && isFocused && (
        <motion.div
          className="absolute top-14 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20"
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
              onMouseDown={clearHistory}
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
                className="px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 cursor-pointer transition-colors duration-150"
                onMouseDown={() => handleRecentSearchClick(search)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
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
