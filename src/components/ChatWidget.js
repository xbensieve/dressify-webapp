import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button, Spin } from "antd";
import { fetchAIResponse } from "../utils/geminiApi";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Added messages state
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  const widgetRef = useRef(null);
  const lastMessageRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleChat = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage(""); // Clear input field

    try {
      setIsLoading(true);
      const aiResponse = await fetchAIResponse(message);
      const aiMessage = {
        sender: "ai",
        text:
          aiResponse?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        sender: "ai",
        text: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Scroll to the bottom when messages change

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3 sm:gap-4"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.35 }}
            className="w-full sm:w-80 max-w-[90vw] h-[480px] sm:h-[500px] bg-white rounded-2xl shadow-2xl p-4 border border-gray-100"
          >
            <div className="flex justify-between mb-4 border-b pb-2">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2 rounded-l-full font-medium text-sm transition ${
                  activeTab === "chat"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                aria-label="Chat Tab"
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
                aria-label="Zalo Tab"
              >
                Zalo
              </button>
            </div>

            {activeTab === "chat" && (
              <div className="flex flex-col h-[380px] sm:h-[380px]">
                <h2 className="text-base font-semibold text-blue-600 mb-2">
                  Need help? Chat with us!
                </h2>
                <div className="flex-1 overflow-y-auto bg-gray-50 border rounded-md p-3 text-sm text-gray-700 mb-3">
                  {messages.map((msg, index) => (
                    <p
                      key={index}
                      ref={
                        index === messages.length - 1 ? lastMessageRef : null
                      }
                      className={`mb-2 ${
                        msg.sender === "user"
                          ? "text-right text-blue-600"
                          : "text-left text-gray-700"
                      }`}
                    >
                      {msg.sender === "user" ? "You: " : "AI: "}
                      {msg.text}
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    size="small"
                    disabled={isLoading} // Disable input while loading
                  />
                  <Button
                    onClick={handleChat}
                    disabled={!message || isLoading}
                    type="primary"
                    icon={<FaPaperPlane />}
                    size="small"
                    className="bg-blue-600 hover:bg-blue-700"
                    aria-label="Send Message"
                  />
                  {isLoading && (
                    <Spin size="small" className="ml-2" /> // Add spinner here
                  )}
                </div>
              </div>
            )}

            {activeTab === "zalo" && (
              <div className="flex flex-col items-center justify-center h-full">
                <SiZalo size={48} className="text-green-500 mb-4" />
                <p className="text-gray-700 text-center mb-4">
                  Connect with us on Zalo for faster support.
                </p>
                <button
                  onClick={openZaloChat}
                  className="bg-green-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                  aria-label="Open Zalo"
                >
                  Open Zalo
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
