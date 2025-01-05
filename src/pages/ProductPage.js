import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import productApi from "../api/productApi";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedFilters = useOutletContext();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const fetchProductData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await productApi.getProducts(page);
      setProducts(response.products);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page });
    }
  };

  const handleProductClick = (productId) => {
    navigate("/detail", { state: { productId } });
  };
  const filteredProducts = products.filter((product) => {
    if (
      selectedFilters.color.length === 0 &&
      selectedFilters.size.length === 0
    ) {
      return true;
    }
    const isColorMatch =
      selectedFilters.color.length === 0 ||
      selectedFilters.color.some((color) =>
        product.colors?.some(
          (productColor) => productColor.toLowerCase() === color.toLowerCase()
        )
      );
    const isSizeMatch =
      selectedFilters.size.length === 0 ||
      selectedFilters.size.some((size) =>
        product.sizes?.some(
          (productSize) => productSize.toLowerCase() === size.toLowerCase()
        )
      );
    return isColorMatch && isSizeMatch;
  });
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

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="group cursor-pointer"
              >
                <img
                  alt={product.name}
                  src={product.image}
                  className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <h3 className="mt-4 text-sm text-gray-700 truncate">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${new Intl.NumberFormat().format(product.unitPrice)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md disabled:bg-gray-400"
            >
              Previous
            </button>
            <span className="mx-4 text-sm font-medium text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
