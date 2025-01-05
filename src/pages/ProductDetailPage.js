import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import productApi from "../api/productApi";
import decodeAccessToken from "../utils/decodeJwt";
import createOrder from "../api/orderApi";
import createPayment from "../api/paymentApi";
const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = location.state || {};
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [address, setAddress] = useState("1234 Main St, Anytown, USA");
  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await productApi.getProductById(productId);
      console.log(response);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    } finally {
      setLoading(false);
    }
  };
  const addToCart = (product) => {
    if (!selectedColor || !selectedSize || selectedQuantity === 0) {
      alert("Please select color, size, and quantity before adding to cart.");
      return;
    }
    const cookieName = "cart";
    const getCartFromCookies = () => {
      const cookies = document.cookie.split("; ");
      const cartCookie = cookies.find((row) =>
        row.startsWith(`${cookieName}=`)
      );
      return cartCookie
        ? JSON.parse(decodeURIComponent(cartCookie.split("=")[1]))
        : [];
    };
    const saveCartToCookies = (cart) => {
      document.cookie = `${cookieName}=${encodeURIComponent(
        JSON.stringify(cart)
      )}; path=/; max-age=${60 * 60 * 24 * 7}`;
    };
    const cart = getCartFromCookies();
    const productToAdd = {
      name: product.name,
      image: product.image,
      productId: product._id,
      quantity: selectedQuantity,
      unitPrice: product.unitPrice,
      color: selectedColor,
      size: selectedSize,
    };

    const existingProductIndex = cart.findIndex(
      (item) =>
        item.productId === productToAdd.productId &&
        item.color === productToAdd.color &&
        item.size === productToAdd.size
    );

    if (existingProductIndex !== -1) {
      // If product exists, update the quantity
      cart[existingProductIndex].quantity += selectedQuantity;
    } else {
      cart.push(productToAdd);
    }
    saveCartToCookies(cart);
    alert("Product added to cart!");
    setSelectedColor("");
    setSelectedSize("");
    setSelectedQuantity(0);
  };
  useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);
  const toggleColorSelection = (color) => {
    setSelectedColor(selectedColor === color ? null : color);
  };

  const toggleSizeSelection = (size) => {
    setSelectedSize(selectedSize === size ? null : size);
  };

  const sendOrder = async () => {
    if (!selectedColor) {
      alert("Please select a color before submitting the order.");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size before submitting the order.");
      return;
    }
    if (selectedQuantity === 0) {
      alert("Please select a valid quantity before submitting the order.");
      return;
    }
    const orderPayload = {
      userId: decodeAccessToken(localStorage.getItem("access_token")).id,
      method: "VNPAY",
      address: address,
      products: [
        {
          productId: productId,
          quantity: selectedQuantity,
          unitPrice: product.unitPrice,
          color: selectedColor,
          size: selectedSize,
        },
      ],
    };
    try {
      document.body.style.cursor = "wait";
      const createOrderResponse = await createOrder(orderPayload);
      if (!createOrderResponse || !createOrderResponse.orderId) {
        throw new Error("Cannot create order. Please try again!");
      }
      const paymentResponse = await createPayment(createOrderResponse.orderId);
      if (!paymentResponse || !paymentResponse.paymentUrl) {
        throw new Error("Cannot create payment URL. Please try again!");
      }
      alert("Order placed successfully!");
      window.location.href = paymentResponse.paymentUrl;
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      document.body.style.cursor = "default";
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-200 rounded-full border-t-4 border-t-blue-600"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Please wait, loading...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
        <div className="w-full lg:w-1/2">
          <img
            className="hidden lg:block"
            src="https://i.ibb.co/v30JLYr/Group-192-2.png"
            alt=""
          />
          <img
            className="hidden md:block lg:hidden"
            src="https://i.ibb.co/c1ggfn2/Group-193.png"
            alt=""
          />
          <img
            className="md:hidden"
            src="https://i.ibb.co/8gTVH2Y/Group-198.png"
            alt=""
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
            Looks like you've found the doorway to the great nothing
          </h1>
          <p className="py-4 text-base text-gray-800">
            The content you’re looking for doesn’t exist. Either it was removed,
            or you mistyped the link.
          </p>
          <p className="py-2 text-base text-gray-800">
            Sorry about that! Please visit our hompage to get where you need to
            go.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
          >
            Go back to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-5xl max-w-3xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 shadow-lg p-6 rounded-lg bg-white">
          {/* Product Image Section */}
          <div className="lg:col-span-3 w-full text-center">
            <div className="p-4 rounded-lg shadow-lg relative bg-gray-50">
              <img
                src={product.image}
                alt="Product"
                className="w-full h-64 max-w-md mx-auto object-contain rounded-lg"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  fill="#ccc"
                  className="hover:fill-red-600 transition-all duration-300"
                  viewBox="0 0 64 64"
                >
                  <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:col-span-2">
            {/* Product Name */}
            <h2 className="text-3xl font-extrabold text-gray-800">
              {product.name}
            </h2>

            {/* Ratings */}
            <div className="flex space-x-2 mt-4 items-center">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 fill-blue-600"
                  viewBox="0 0 14 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
              <svg
                className="w-5 fill-gray-300"
                viewBox="0 0 14 13"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 className="text-gray-600 text-sm">500 Reviews</h4>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-gray-800 text-3xl font-bold">
                {product.unitPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>

            {/* Choose Color */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-3 mt-4">
                {product.colors.map((color) => (
                  <button
                    key={color.trim()}
                    onClick={() => toggleColorSelection(color.trim())}
                    className={`px-4 py-2 border-2 rounded-md font-medium text-lg transition-all hover:scale-105 ${
                      selectedColor === color.trim()
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {color.trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Size */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Choose a Size</h3>
              <div className="flex flex-wrap gap-3 mt-4">
                {product.sizes.map((size) => (
                  <button
                    key={size.trim()}
                    onClick={() => toggleSizeSelection(size.trim())}
                    className={`px-4 py-2 border-2 rounded-md font-medium text-lg transition-all hover:scale-105 ${
                      selectedSize === size.trim()
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {size.trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quantity</h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedQuantity(Math.max(selectedQuantity - 1, 1))
                  }
                  className="px-4 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300 transition-all"
                >
                  -
                </button>
                <input
                  type="number"
                  value={selectedQuantity}
                  min="1"
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  className="w-16 text-center p-2 border-2 border-gray-300 rounded focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={sendOrder}
                className="w-full lg:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-all"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="w-full lg:w-auto px-6 py-3 border border-blue-600 bg-transparent hover:bg-gray-100 text-blue-600 text-sm font-semibold rounded-lg transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div class="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 class="text-xl font-bold text-gray-800 text-center mb-6">
            Product Details
          </h3>
          <ul class="space-y-6 text-gray-800">
            <li class="text-sm flex justify-between items-center">
              <span class="font-semibold w-1/2">Fabric type</span>
              <span class="w-1/2 text-right">{product.FabricType}</span>
            </li>
            <li class="text-sm flex justify-between items-center">
              <span class="font-semibold w-1/2">Care Instructions</span>
              <span class="w-1/2 text-right">{product.CareInstructions}</span>
            </li>
            <li class="text-sm flex justify-between items-center">
              <span class="font-semibold w-1/2">Origin</span>
              <span class="w-1/2 text-right">{product.Origin}</span>
            </li>
            <li class="text-sm flex justify-between items-center">
              <span class="font-semibold w-1/2">Closure Type</span>
              <span class="w-1/2 text-right">{product.ClosureType}</span>
            </li>
          </ul>
        </div>
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800">
            Product Description
          </h3>
          <p className="mt-4 text-gray-700">
            {product.description ||
              "No description available for this product."}
          </p>
        </div>
        <div class="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
          <div class="grid md:grid-cols-2 gap-12 mt-4">
            <div class="space-y-3">
              <div class="flex items-center">
                <p class="text-sm text-gray-800 font-bold">{product.Rating}</p>
                <svg
                  class="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div class="bg-gray-400 rounded w-full h-2 ml-3">
                  <div class="w-2/3 h-full rounded bg-blue-600"></div>
                </div>
                <p class="text-sm text-gray-800 font-bold ml-3">66%</p>
              </div>

              <div class="flex items-center">
                <p class="text-sm text-gray-800 font-bold">4.0</p>
                <svg
                  class="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div class="bg-gray-400 rounded w-full h-2 ml-3">
                  <div class="w-1/3 h-full rounded bg-blue-600"></div>
                </div>
                <p class="text-sm text-gray-800 font-bold ml-3">33%</p>
              </div>

              <div class="flex items-center">
                <p class="text-sm text-gray-800 font-bold">3.0</p>
                <svg
                  class="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div class="bg-gray-400 rounded w-full h-2 ml-3">
                  <div class="w-1/6 h-full rounded bg-blue-600"></div>
                </div>
                <p class="text-sm text-gray-800 font-bold ml-3">16%</p>
              </div>

              <div class="flex items-center">
                <p class="text-sm text-gray-800 font-bold">2.0</p>
                <svg
                  class="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div class="bg-gray-400 rounded w-full h-2 ml-3">
                  <div class="w-1/12 h-full rounded bg-blue-600"></div>
                </div>
                <p class="text-sm text-gray-800 font-bold ml-3">8%</p>
              </div>

              <div class="flex items-center">
                <p class="text-sm text-gray-800 font-bold">1.0</p>
                <svg
                  class="w-5 fill-blue-600 ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div class="bg-gray-400 rounded w-full h-2 ml-3">
                  <div class="w-[6%] h-full rounded bg-blue-600"></div>
                </div>
                <p class="text-sm text-gray-800 font-bold ml-3">6%</p>
              </div>
            </div>

            <div>
              <div class="flex items-start">
                <img
                  src="https://readymadeui.com/team-2.webp"
                  alt=""
                  class="w-12 h-12 rounded-full border-2 border-white"
                />
                <div class="ml-3">
                  <h4 class="text-sm font-bold text-gray-800">John Doe</h4>
                  <div class="flex space-x-1 mt-1">
                    <svg
                      class="w-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      class="w-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      class="w-4 fill-blue-600"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      class="w-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <svg
                      class="w-4 fill-[#CED5D8]"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <p class="text-xs !ml-2 font-semibold text-gray-800">
                      2 mins ago
                    </p>
                  </div>
                  <p class="text-sm mt-4 text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                    eiusmod tempor incidunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
              >
                Read all reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailPage;
