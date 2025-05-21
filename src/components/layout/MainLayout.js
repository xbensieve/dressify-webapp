import { Outlet, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import Header from "../Header";
import Footer from "../Footer";
import ChatWidget from "../ChatWidget";

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
      <ChatWidget />
    </div>
  );
};

export default MainLayout;
