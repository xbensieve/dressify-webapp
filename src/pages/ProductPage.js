import "../styles/Product.css";
import Hoodie from "../assets/hoodie.jpg";
import Bomber from "../assets/bomber.png";
import KakiJacket from "../assets/kakijacket.jpg";
import HamburgerIcon from "../assets/hamburger-icon.png";
import SearchIcon from "../assets/search-icon.png";
import UserIcon from "../assets/user-icon.png";
import Cart from "../assets/cart.png";
const ProductPage = () => {
  return (
    <>
      <div class="header">
        <div class="left-section">
          <img class="hamburger-menu" src={HamburgerIcon} alt="" />
        </div>
        <div class="middle-section">
          <input class="search-bar" type="text" placeholder="Search..." />
          <button class="search-button">
            <img class="search-icon" src={SearchIcon} alt="" />
          </button>
        </div>
        <div class="right-section">
          <div class="user-icon">
            <img class="upload-icon" src={UserIcon} alt="" />
          </div>
        </div>
      </div>
      <div class="product-grid">
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={Hoodie} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo hoodie nam nỉ bông</p>
            </div>
          </div>
        </div>
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={KakiJacket} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo khoác F23 KAKI JACKET chất</p>
            </div>
          </div>
        </div>
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={Bomber} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo khoác bomber nam nữ unisex đẹp</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product-grid">
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={Hoodie} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo hoodie nam nỉ bông</p>
            </div>
          </div>
        </div>
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={KakiJacket} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo khoác F23 KAKI JACKET chất</p>
            </div>
          </div>
        </div>
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={Bomber} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo khoác bomber nam nữ unisex đẹp</p>
            </div>
          </div>
        </div>
      </div>
      <div class="product-grid">
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={Hoodie} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo hoodie nam nỉ bông</p>
            </div>
          </div>
        </div>
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={KakiJacket} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo khoác F23 KAKI JACKET chất</p>
            </div>
          </div>
        </div>
        <div class="product-preview">
          <div class="picture-row">
            <img class="product-picture" src={Bomber} alt="hoodie" />
          </div>
          <div class="product-info-grid">
            <div class="cart-picture">
              <img class="cart" src={Cart} alt="" />
            </div>
            <div class="product-info">
              <p class="product-title">Áo khoác bomber nam nữ unisex đẹp</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
