import "../styles/SideBar.css";
import FilterIcon from "../assets/filter.png";
import DownIcon from "../assets/down.png";
const SideBar = () => {
  return (
    <>
      <div class="sidebar">
        <div class="filter-grid">
          <div class="filter">
            <img class="filter-icon" src={FilterIcon} alt="" />
          </div>
          <div class="filter-status">Bộ lọc tìm kiếm</div>
        </div>
        <div class="filter-group">Theo Danh Mục</div>
        <ul class="filter-option">
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
        <div class="filter-group">Nơi Bán</div>
        <ul class="filter-option">
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
        <div class="filter-group">Thương Hiệu</div>
        <ul class="filter-option">
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
