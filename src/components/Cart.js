import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Giỏ Hàng</h2>
      {cartItems.length === 0 && <p>Chưa có sản phẩm nào.</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} x {item.price.toLocaleString()} VND
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Xóa
            </button>
          </li>
        ))}
      </ul>
      <h3>Tổng: {total.toLocaleString()} VND</h3>
      <button onClick={() => dispatch(clearCart())}>Xóa tất cả</button>
    </div>
  );
};

export default Cart;
