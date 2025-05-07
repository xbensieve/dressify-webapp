import logo from "../assets/logo.png";
import { motion } from "framer-motion";
const Logo = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <a href="/" className="flex items-center">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src={logo}
            className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16"
            alt="SkyLines Logo"
            loading="lazy"
          />
          <span className="self-center text-4xl font-inter tracking-tight text-gray-900 whitespace-nowrap sm:text-5xl">
            Xbensieve
          </span>
        </motion.div>
      </a>
    </div>
  );
};
export default Logo;
