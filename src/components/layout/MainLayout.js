import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import Header from "../Header";
import Footer from "../Footer";
import ChatWidget from "../ChatWidget";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to generate breadcrumb items from pathname
const getBreadcrumbItems = (pathname) => {
  const paths = pathname.split("/").filter((path) => path);
  const items = [
    {
      title: "Home",
      href: "/",
    },
  ];

  paths.forEach((path, index) => {
    items.push({
      title: path.charAt(0).toUpperCase() + path.slice(1),
      href: `/${paths.slice(0, index + 1).join("/")}`,
    });
  });

  return items;
};

const MainLayout = () => {
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbItems(location.pathname);
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-layout relative min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          className="my-4 text-sm sm:text-base"
          items={breadcrumbItems}
          itemRender={(item, _, items, index) => {
            const isLast = index === items.length - 1;
            return isLast ? (
              <span className="text-gray-500">{item.title}</span>
            ) : (
              <a
                href={item.href}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {item.title}
              </a>
            );
          }}
        />
      </div>
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
      <AnimatePresence>
        {showTopBtn && (
          <motion.div
            key="back-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
              fixed bottom-24 md:bottom-20 right-6 sm:right-5 z-50
              "
            style={{ pointerEvents: "auto" }}
          >
            <Button
              shape="circle"
              size="large"
              icon={<UpOutlined />}
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to Top"
              className="shadow-lg bg-black text-white border-black hover:bg-white hover:text-black hover:opacity-75 active:bg-white active:text-black active:shadow-md transition-shadow duration-300"
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                borderColor: "#000000",
                transition:
                  "background-color 0.3s, color 0.3s, box-shadow 0.3s",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ChatWidget />
    </div>
  );
};

export default MainLayout;
