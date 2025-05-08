import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const products = [
  { id: 1, name: "Vòng tay vàng", price: 2000000 },
  { id: 2, name: "Nhẫn kim cương", price: 5000000 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Sản phẩm</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price.toLocaleString()} VND
            <button onClick={() => dispatch(addToCart({ ...p, quantity: 1 }))}>
              Thêm vào giỏ
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
