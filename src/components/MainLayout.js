import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import "../styles/MainLayout.css";
const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <SideBar />
          </div>
          <div className="col-md-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
