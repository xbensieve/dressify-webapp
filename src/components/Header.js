import "../styles/Header.css";
import HamburgerIcon from "../assets/hamburger.png";
import SearchIcon from "../assets/search.png";
import UserIcon from "../assets/user-icon.png";
import ShoppingCart from "../assets/shopping-bag.png";
const Header = () => {
  return (
    <div>
      <div class="header">
        <div class="left-section">
          <button class="hamburger-menu">
            <img class="hamburger-icon" src={HamburgerIcon} alt="" />
          </button>
        </div>
        <div class="middle-section">
          <form class="form-search" action="#">
            <input
              class="search-bar"
              type="text"
              name="keyword"
              placeholder="Tìm sản phẩm, thương hiệu, và tên shop"
            />
            <button class="search-button">
              <img class="search-icon" src={SearchIcon} alt="" />
            </button>
          </form>
        </div>
        <div class="right-section">
          <div class="right-grid">
            <div class="cart">
              <button class="cart-button">
                <img class="cart-icon" src={ShoppingCart} alt="" />
              </button>
            </div>
            <div class="profile-picture">
              <button class="profile-button">
                <img class="user-icon" src={UserIcon} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
