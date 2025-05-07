import React, { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
import { SiZalo } from "react-icons/si"; // Import Zalo icon
import { motion } from "framer-motion";
import { Input, Button } from "antd";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat"); // State to toggle between Chat and Zalo

  const toggleChat = () => setIsOpen(!isOpen);

  const openZaloChat = () => {
    window.open("https://zalo.me/your-zalo-id", "_blank"); // Replace with your Zalo chat link
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label="Toggle Chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="mt-4 w-80 h-96 bg-white rounded-xl shadow-2xl p-4 border border-gray-200"
        >
          <div className="flex justify-around mb-4">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-full ${
                activeTab === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveTab("zalo")}
              className={`px-4 py-2 rounded-full ${
                activeTab === "zalo"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Zalo
            </button>
          </div>

          {activeTab === "chat" && (
            <div className="flex flex-col h-[85%]">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                Chat with us
              </h2>
              <div className="flex-1 overflow-y-auto border p-2 mb-2 rounded text-sm text-gray-700">
                <p>Hello! How can we help you today?</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  className="flex-1"
                  size="small"
                />
                <Button type="primary" size="small">
                  Send
                </Button>
              </div>
            </div>
          )}

          {activeTab === "zalo" && (
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-lg font-semibold mb-4 text-green-600">
                Chat on Zalo
              </h2>
              <button
                onClick={openZaloChat}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow hover:bg-green-600 transition"
              >
                <SiZalo size={20} />
                Open Zalo
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ChatWidget;
