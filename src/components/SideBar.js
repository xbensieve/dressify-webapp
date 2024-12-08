import React, { useState } from "react";
import "../styles/SideBar.css";
import FilterIcon from "../assets/filter.png";
import DownIcon from "../assets/down.png";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to manage the collapse/expand

  // Toggle collapse/expand state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <>
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div class="filter-grid">
          <div class="filter">
            <img class="filter-icon" src={FilterIcon} alt="" />
          </div>
          <div class="filter-status">Bộ lọc tìm kiếm</div>
        </div>
        {/* Toggle button to collapse/expand */}
        <button
          className="btn btn-outline-primary d-flex align-items-center"
          onClick={toggleSidebar}
        >
          {isCollapsed ? "Mở Bộ Lọc" : "Thu Gọn Bộ Lọc"}
        </button>
        <div className={`filter-group ${isCollapsed ? "d-none" : ""}`}>
          Theo Danh Mục
        </div>
        <ul className={`filter-option ${isCollapsed ? "d-none" : ""}`}>
          <li>
            <input type="checkbox" />
            Áo thun
          </li>
          <li>
            <input type="checkbox" />
            Áo khoác
          </li>
          <li>
            <input type="checkbox" />
            Hoodie & Áo nỉ
          </li>
          <li>
            <input type="checkbox" />
            Phụ kiện thời trang
          </li>
          <li>
            <button class="toggle-button-grid">
              <span class="toggle-text">Thêm</span>
              <img class="down-icon" src={DownIcon} alt="" />
            </button>
          </li>
        </ul>
        <hr></hr>
        <div className={`filter-group ${isCollapsed ? "d-none" : ""}`}>
          Nơi Bán
        </div>
        <ul className={`filter-option ${isCollapsed ? "d-none" : ""}`}>
          <li>
            <input type="checkbox" />
            Hà Nội
          </li>
          <li>
            <input type="checkbox" />
            TP. Hồ Chí Minh
          </li>
          <li>
            <input type="checkbox" />
            Thái Nguyên
          </li>
          <li>
            <input type="checkbox" />
            Vĩnh Phúc
          </li>
          <li>
            <button class="toggle-button-grid">
              <span class="toggle-text">Thêm</span>
              <img class="down-icon" src={DownIcon} alt="" />
            </button>
          </li>
        </ul>
        <hr></hr>
        <div className={`filter-group ${isCollapsed ? "d-none" : ""}`}>
          Thương Hiệu
        </div>
        <ul className={`filter-option ${isCollapsed ? "d-none" : ""}`}>
          <li>
            <input type="checkbox" />
            AVOCADO
          </li>
          <li>
            <input type="checkbox" />
            PH
          </li>
          <li>
            <input type="checkbox" />
            ADAM STORE
          </li>
          <li>
            <input type="checkbox" />
            Elnido
          </li>
          <li>
            <button class="toggle-button-grid">
              <span class="toggle-text">Thêm</span>
              <img class="down-icon" src={DownIcon} alt="" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
