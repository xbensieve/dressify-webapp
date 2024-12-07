import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
const MainLayout = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
