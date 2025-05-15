import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-0 z-50 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <svg
            className="animate-spin h-10 w-10 sm:h-12 sm:w-12 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            Loading, please wait...
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loading;
