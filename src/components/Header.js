import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginApi } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import decodeAccessToken from "../utils/decodeJwt";
const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const leftMenuItems = [
    { text: "Contact", href: "/contact" },
    { text: "About Us", href: "/about-us" },
    { text: "Term & Policy", href: "/terms-and-policy" },
  ];
  const token = Cookies.get("access_token");
  useEffect(() => {
    //decode token to get user info
    if (token) {
      const decodedToken = decodeAccessToken(token);
      const userInfo = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        role: decodedToken.role,
      };
      setUser(userInfo);
    }
  }, [token, setUser]);
  const rightMenuItems = user
    ? [
        ...(user.role === "admin"
          ? [
              {
                text: "Admin Panel",
                href: "/admin",
                onClick: (e) => {
                  e.preventDefault();
                  navigate("/admin");
                },
              },
            ]
          : []),
        {
          text: "Logout",
          href: "#",
          onClick: (e) => {
            e.preventDefault();
            loginApi.logout();
            setUser(null);
            navigate("/login");
          },
        },
      ]
    : [
        {
          text: "Sign In",
          href: "/login",
          onClick: (e) => {
            e.preventDefault();
            navigate("/login", { state: { showRegister: false } });
          },
        },
        {
          text: "Register",
          href: "/login",
          onClick: (e) => {
            e.preventDefault();
            navigate("/login", { state: { showRegister: true } });
          },
        },
      ];

  const MenuItems = [
    { text: "Contact", href: "/contact" },
    { text: "About Us", href: "/about-us" },
    { text: "Term & Policy", href: "/terms-and-policy" },
    ...rightMenuItems,
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <div className="hidden lg:flex items-center space-x-4">
            {leftMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-gray-500 font-inter"
              >
                {item.text}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            {rightMenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="hover:text-gray-500 font-inter"
                onClick={item.onClick}
              >
                {item.text}
              </a>
            ))}
          </div>
        </div>
        <motion.div
          ref={menuRef}
          initial={{ x: "-100%" }}
          animate={{ x: isMenuOpen ? "0%" : "-100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg lg:hidden z-50"
        >
          <div className="flex flex-col space-y-5 p-4">
            {MenuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 font-inter"
                onClick={item.onClick}
              >
                {item.text}
              </a>
            ))}
          </div>
        </motion.div>
        <nav className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-between mx-auto max-w-screen-xl">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="flex-grow flex justify-center items-center">
              <SearchBar />
              <button
                type="button"
                className="ml-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                aria-label="Cart"
                onClick={() => navigate("/cart")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </nav>
    </header>
  );
};

export default Header;
