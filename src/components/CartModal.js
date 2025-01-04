import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function CartModal() {
  const [isCartModal, setIsCartModal] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedCart = Cookies.get("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
    if (isCartModal) {
      const storedCart = Cookies.get("cart");
      setCart(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [isCartModal]);

  const saveCartToCookies = (cart) => {
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(
      (product) => product.ProductId !== productId
    );
    setCart(updatedCart);
    saveCartToCookies(updatedCart);
  };
  const handlePayment = () => {
    window.location.href =
      "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=1806000&vnp_Command=pay&vnp_CreateDate=20210801153333&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=DEMOV210&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=3e0d61a0c0534b2e36680b3f7277743e8784cc4e1d68fa7d276e79c23be7d6318d338b477910a27992f5057bb1582bd44bd82ae8009ffaf6d141219218625c42";
  };
  const totalPrice = cart.reduce(
    (total, product) => total + product.Price * product.quantity,
    0
  );
  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  return (
    <>
      <button
        onClick={() => setIsCartModal(true)}
        className="relative block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
      >
        Cart
        {totalItems > 0 && (
          <span className="absolute top-[-0px] right-[-18px] inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>

      {isCartModal && (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-3xl p-6 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
              viewBox="0 0 320.591 320.591"
              onClick={() => setIsCartModal(false)}
            >
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
            </svg>

            <h4 className="text-base font-bold text-gray-800 mt-6">{`${cart.length} Items`}</h4>

            <div className="space-y-4 mt-6">
              {cart.map((product) => (
                <div
                  className="flex flex-wrap items-center justify-between gap-4"
                  key={product.ProductId}
                >
                  <div className="flex items-center">
                    <img
                      src={product.ImageUrl}
                      className="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md"
                      alt={product.ProductName}
                    />
                    <div className="ml-4">
                      <p className="text-sm text-gray-800">
                        {product.ProductName}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">{`${product.quantity} Item`}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <span className="text-base font-bold text-gray-800 mr-4">
                      ${product.Price}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[18px] fill-red-500 inline cursor-pointer"
                      viewBox="0 0 24 24"
                      onClick={() => removeFromCart(product.ProductId)}
                    >
                      <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                      <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex mt-6">
              <span className="text-base font-bold text-gray-800 flex-1">
                Total
              </span>
              <span className="text-base font-bold text-gray-800">
                ${totalPrice}
              </span>
            </div>

            <div className="flex max-sm:flex-col gap-4 mt-6">
              <button
                type="button"
                className="text-sm px-5 py-2.5 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md tracking-wide"
                onClick={() => setIsCartModal(false)}
              >
                Continue shopping
              </button>
              <button
                type="button"
                className="text-sm px-5 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md tracking-wide"
                onClick={() => handlePayment()}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartModal;
