import "../styles/Header.css";
import Logo from "../assets/logo-website.png";
import SearchIcon from "../assets/search.png";
import UserIcon from "../assets/user.png";
import ShoppingCart from "../assets/shopping-cart.png";
const Header = () => {
  return (
    <nav class="navbar d-flex flex-wrap fixed-top navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">
          <div class="logo-toggle">
            <img src={Logo} alt="" class="logo" />
            <span class="brand-text">SkyLines</span>
          </div>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <form class="d-flex">
                <input
                  class="search-bar"
                  type="text"
                  name="keyword"
                  placeholder="Search..."
                  aria-label="Search"
                />
                <button class="search-button bg-light" type="submit">
                  <img class="search-icon" src={SearchIcon} alt="" />
                </button>
              </form>
            </li>
            <li class="nav-item">
              <button class="cart-button" href="/">
                <img src={ShoppingCart} class="cart-icon" alt="" />
              </button>
            </li>
            <li class="nav-item">
              <button class="user-button">
                <img class="user-icon" src={UserIcon} alt="" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
