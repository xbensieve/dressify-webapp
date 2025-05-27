import React, { useState, useRef, useEffect } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { Input, Button, Spin } from "antd";
import { fetchAIResponse } from "../utils/geminiApi";

const ChatSection = ({
  messages,
  message,
  setMessage,
  handleChat,
  isLoading,
  lastMessageRef,
}) => (
  <div className="flex flex-col h-[320px]">
    <h2 className="text-sm font-semibold text-blue-600 mb-2">
      AI Assistant Conversation
    </h2>
    <div className="flex-1 overflow-y-auto rounded-lg p-3 text-xs">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`mb-2 flex font-inter ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-2 text-xs ${
              msg.sender === "user"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-200 text-gray-800"
            } word-break break-word`}
          >
            <span className="font-medium">
              {msg.sender === "user" ? "You: " : "AI: "}
            </span>
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
    <div className="flex items-center gap-1 mt-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.trim() && !isLoading) {
              handleChat();
            }
          }
        }}
        className="flex-grow px-3 py-2 border rounded-full focus:outline-none text-sm"
        placeholder="Type your message..."
        aria-label="Chat input"
      />

      {!isLoading ? (
        <Button
          onClick={handleChat}
          disabled={!message.trim()}
          icon={<FaPaperPlane />}
          size="large"
          className="border-none bg-transparent"
          aria-label="Send Message"
        />
      ) : (
        <Spin size="default" className="ml-1" />
      )}
    </div>
  </div>
);

const ZaloSection = ({ openZaloChat }) => (
  <div className="flex flex-col items-center justify-center h-[320px]">
    <SiZalo size={40} className="text-blue-500 mb-3" />
    <p className="text-gray-700 text-center text-md mb-3">
      Connect with us on Zalo for faster support.
    </p>
    <button
      onClick={openZaloChat}
      className="bg-blue-600 text-white px-4 py-2 font-semibold rounded-full shadow-md hover:opacity-75 transition-all duration-200 text-sm"
      aria-label="Open Zalo"
    >
      Open Zalo
    </button>
  </div>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const widgetRef = useRef(null);
  const lastMessageRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleChat = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

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
  }, [messages]);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-4 right-4 z-50 flex items-end gap-2"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="w-[90vw] max-w-[360px] h-[400px] bg-white rounded-xl shadow-2xl p-3 border border-gray-100"
          >
            <div className="flex justify-between mb-3 border-b pb-1.5">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-1.5 rounded-l-md font-inter text-xs transition-all duration-200 ${
                  activeTab === "chat"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label="Chat Tab"
              >
                Chat
              </button>
              <button
                onClick={() => setActiveTab("zalo")}
                className={`flex-1 py-1.5 rounded-r-md font-medium text-xs transition-all duration-200 ${
                  activeTab === "zalo"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-label="Zalo Tab"
              >
                Zalo
              </button>
            </div>
            {activeTab === "chat" && (
              <ChatSection
                messages={messages}
                message={message}
                setMessage={setMessage}
                handleChat={handleChat}
                isLoading={isLoading}
                lastMessageRef={lastMessageRef}
              />
            )}
            {activeTab === "zalo" && (
              <ZaloSection openZaloChat={openZaloChat} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={toggleChat}
        className="bg-black text-white p-3 rounded-full shadow-xl hover:bg-gradient-to-tr hover:opacity-75 hover:shadow-2xl transition-all duration-200"
        aria-label="Toggle Chat"
        whileTap={{ scale: 0.9 }}
      >
        <FaComments size={20} />
      </motion.button>
    </div>
  );
};

export default ChatWidget;
