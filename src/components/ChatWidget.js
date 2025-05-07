import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button } from "antd";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const widgetRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const openZaloChat = () => {
    window.open("https://zalo.me/your-zalo-id", "_blank");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3 sm:gap-4"
    >
      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.35 }}
            className="w-full sm:w-80 max-w-[90vw] h-[480px] sm:h-[500px] bg-white rounded-2xl shadow-2xl p-4 border border-gray-100"
          >
            {/* Tabs */}
            <div className="flex justify-between mb-4 border-b pb-2">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2 rounded-l-full font-medium text-sm transition ${
                  activeTab === "chat"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab("zalo")}
                className={`flex-1 py-2 rounded-r-full font-medium text-sm transition ${
                  activeTab === "zalo"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Zalo
              </button>
            </div>

            {/* Chat Content */}
            {activeTab === "chat" && (
              <div className="flex flex-col h-[380px] sm:h-[380px]">
                <h2 className="text-base font-semibold text-blue-600 mb-2">
                  Need help? Chat with us!
                </h2>
                <div className="flex-1 overflow-y-auto bg-gray-50 border rounded-md p-3 text-sm text-gray-700 mb-3">
                  <p className="mb-2">👋 Hello! How can we assist you today?</p>
                  {/* Chat messages */}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                    size="small"
                  />
                  <Button
                    type="primary"
                    icon={<FaPaperPlane />}
                    size="small"
                    className="bg-blue-600 hover:bg-blue-700"
                  />
                </div>
              </div>
            )}

            {/* Zalo Content */}
            {activeTab === "zalo" && (
              <div className="flex flex-col items-center justify-center h-full">
                <SiZalo size={48} className="text-green-500 mb-4" />
                <p className="text-gray-700 text-center mb-4">
                  Connect with us on Zalo for faster support.
                </p>
                <button
                  onClick={openZaloChat}
                  className="bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                >
                  Open Zalo
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button stays fixed */}
      <div className="flex flex-col items-center space-y-1">
        <motion.button
          onClick={toggleChat}
          className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all"
          aria-label="Toggle Chat"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaComments size={22} />
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;
