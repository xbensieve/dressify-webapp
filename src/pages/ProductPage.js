import React, { useState, useEffect } from "react";
import "../styles/Product.css";
import Hoodie from "../assets/hoodie.jpg";
import Bomber from "../assets/bomber.png";
import KakiJacket from "../assets/kakijacket.jpg";
import Cart from "../assets/cart.png";
import Loader from "../components/Loader";

const ProductPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [arraySize, setArraySize] = useState(9);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      const baseProducts = [
        {
          id: 1,
          img: Hoodie,
          title: "Áo hoodie nam nỉ bông",
        },
        {
          id: 2,
          img: KakiJacket,
          title: "Áo khoác F23 KAKI JACKET chất",
        },
        {
          id: 3,
          img: Bomber,
          title: "Áo khoác bomber nam nữ unisex đẹp",
        },
      ];

      const dynamicProducts = Array.from({ length: arraySize }, (_, index) => {
        const baseIndex = index % baseProducts.length;
        return { ...baseProducts[baseIndex], dynamicId: index + 1 };
      });

      setProducts(dynamicProducts);
    }, 2000);

    return () => clearTimeout(timer);
  }, [arraySize]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="product-container container">
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.dynamicId} className="product-preview">
            <div className="picture-row">
              <img
                className="product-picture"
                src={product.img}
                alt={product.title}
              />
            </div>
            <div className="product-info-grid">
              <div className="cart-picture">
                <img className="cart" src={Cart} alt="cart" />
              </div>
              <div className="product-info">
                <p className="product-title">{product.title}</p>
                <p className="card-text">$19.00</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
