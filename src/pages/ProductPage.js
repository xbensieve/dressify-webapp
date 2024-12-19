import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to fetch product data
  const fetchProductData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://script.google.com/macros/s/AKfycbxLN8crEvsNgv9zbBg38tu0ftSKqfMSMydEFh7sI0utshLagEQPygX64e98SkvFlqDV/exec?action=read&path=products&page=${page}&limit=5`
      );
      setProducts(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
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
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <a key={product.ProductId} href="#" className="group">
                  <img
                    alt={product.ProductName}
                    src={product.ImageUrl}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                  />
                  <h3 className="mt-4 text-sm text-gray-700 truncate">
                    {product.ProductName}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat().format(product.Price)} VND
                  </p>
                </a>
              ))}
            </div>

            {/* Pagination Controls */}
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
        )}
      </div>
    </div>
  );
};

export default ProductPage;
