import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
const ProductDetailPage = () => {
  const location = useLocation(); // Get location object
  const { productId } = location.state || {}; // Retrieve productId from state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  // Function to fetch product detail
  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbyk5tDOKG6PXyddvJH1-eJ45lipi_IBjg7qqueELxfII7YAiC3QV9BpxggCYli6KULF/exec?action=read&path=products&productId=${productId}`
      );
      const fetchedProduct = response.data.data;
      setProduct(fetchedProduct);
      const urls = fetchedProduct.ImageUrl.split(",");
      setImageUrls(urls);
      setCurrentImage(urls[0].trim());
    } catch (error) {
      console.error("Error fetching product detail:", error);
    } finally {
      setLoading(false);
    }
  };
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productToAdd = { ...product, quantity: 1 };
    cart.push(productToAdd);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };
  useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-5xl max-w-3xl mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-8 shadow-lg p-6 rounded-lg">
          {/* Main Image Section */}
          <div className="lg:col-span-3 w-full text-center">
            <div className="p-4 rounded-lg shadow-lg relative">
              <img
                src={currentImage}
                alt="Product"
                className="w-full h-64 max-w-md mx-auto object-contain rounded-lg"
              />
              <button type="button" className="absolute top-4 right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  fill="#ccc"
                  className="hover:fill-gray-700"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentImage(url.trim())}
                  className={`w-28 h-28 flex items-center justify-center rounded-lg shadow-md cursor-pointer border ${
                    currentImage === url.trim()
                      ? "border-blue-500"
                      : "border-gray-300"
                  } hover:scale-105 transform transition-all duration-300`}
                >
                  <img
                    src={url.trim()}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          <div class="lg:col-span-2">
            <h2 class="text-2xl font-extrabold text-gray-800">
              {product.ProductName}
            </h2>

            <div class="flex space-x-2 mt-4">
              <svg
                class="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-blue-600"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <svg
                class="w-5 fill-[#CED5D8]"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
              </svg>
              <h4 class="text-gray-800 text-base">500 Reviews</h4>
            </div>

            <div class="flex flex-wrap gap-4 mt-8">
              <p class="text-gray-800 text-3xl font-bold">${product.Price}</p>
              <p class="text-gray-400 text-base">
                <strike>$190.00</strike>{" "}
                <span class="text-sm ml-1">Tax included</span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">
                Choose a Color
              </h3>
              <div className="flex flex-wrap gap-3 mt-4">
                {product.Color.split(",").map((color) => (
                  <button
                    key={color.trim()}
                    type="button"
                    className="px-4 py-2 bg-gray-100 border-2 border-gray-300 text-gray-800 rounded-md font-medium text-lg transition-all hover:bg-gray-200"
                  >
                    {color.trim()} {/* Display the color name as text */}
                  </button>
                ))}
              </div>
            </div>

            <div class="flex flex-wrap gap-4 mt-8">
              <button
                type="button"
                class="min-w-[200px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                class="min-w-[200px] px-4 py-2.5 border border-blue-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                onClick={() => addToCart(product)}
              >
                Add to cart
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
            {product.Description ||
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
