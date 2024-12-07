import "../styles/Common.css";
import { useNavigate } from "react-router";
const Welcome = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/product");
  };
  return (
    <>
      <img
        class="banner-img"
        src="https://levents.asia/cdn/shop/files/BANNER_WEB_1.jpg?v=1728379605&width=1500"
        alt=""
      ></img>
      <button class="product-button" onClick={handleClick}>
        Xem Sản Phẩm
      </button>
    </>
  );
};

export default Welcome;
