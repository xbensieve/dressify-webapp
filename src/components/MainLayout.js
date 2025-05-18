import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget"; // import component mới

const MainLayout = () => {
  return (
    <div className="main-layout relative">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
      <ChatWidget />
    </div>
  );
};

export default MainLayout;
