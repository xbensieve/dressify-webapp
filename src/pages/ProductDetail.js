import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation

const ProductDetail = () => {
  const location = useLocation(); // Get location object
  const { productId } = location.state || {}; // Retrieve productId from state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch product detail
  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbyk5tDOKG6PXyddvJH1-eJ45lipi_IBjg7qqueELxfII7YAiC3QV9BpxggCYli6KULF/exec?action=read&path=products&productId=${productId}`
      );
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetail();
    }
  }, [productId]); // Refetch when productId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div>
            <img
              src={product.ImageUrl}
              alt={product.ProductName}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              {product.ProductName}
            </h3>
            <p className="mt-2 text-lg text-gray-700">{product.Description}</p>
            <p className="mt-2 text-xl font-bold text-gray-900">
              {new Intl.NumberFormat().format(product.Price)} VND
            </p>
            <p className="mt-4 text-sm text-gray-500">
              Category: {product.Category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
