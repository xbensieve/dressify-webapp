import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Spin,
  Alert,
  Typography,
  Empty,
  Drawer,
  Button,
} from "antd";
import {
  EnvironmentOutlined,
  FilterOutlined,
  ShoppingCartOutlined,
  StarFilled,
} from "@ant-design/icons";
import productApi from "../../api/productApi";
import FilterSidebar from "../../components/product/FilterSideBar";
import { BulbOutlined } from "@ant-design/icons";
import HorizontalFilterBar from "../../components/product/HorizontalFilterBar";
const { Title, Text } = Typography;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 1000],
    size: "",
    color: "",
    sort: "latest",
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [keyword, filters]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const params = { keyword, ...filters };
        const res = await productApi.searchProducts(params);
        setProducts(res.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setSearchParams({ keyword, ...newFilters });
  };

  const toggleFilterDrawer = () => {
    setIsFilterDrawerVisible(!isFilterDrawerVisible);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <Title level={1} className="!text-sm sm:!text-sm font-inter">
            {products.length !== 0 && (
              <div className="flex items-center gap-x-9 flex-row">
                <span className="text-gray-400 font-sans">
                  <BulbOutlined />
                  Search results for:{" "}
                  <span className="text-black font-semibold">
                    {`'${keyword}'`}
                  </span>
                </span>
                <Button
                  className="lg:hidden"
                  icon={<FilterOutlined />}
                  onClick={toggleFilterDrawer}
                >
                  Search Filters
                </Button>
              </div>
            )}
          </Title>
        </div>
        {products.length !== 0 && (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="hidden lg:block lg:w-1/4">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div className="w-full lg:w-3/4">
              {loading && (
                <div className="flex justify-center items-center h-64">
                  <Spin tip="Loading products..." size="large" />
                </div>
              )}

              {error && (
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  showIcon
                  className="mb-6"
                />
              )}
              <HorizontalFilterBar
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
              <Row gutter={[16, 16]}>
                {products.map((product) => (
                  <Col xs={12} sm={12} md={8} lg={6} key={product._id}>
                    <Link to={`/search/${product._id}`}>
                      <div className="group relative h-full border border-gray-300">
                        <Card
                          hoverable
                          className="rounded-none hover:outline transition duration-250 ease-in-out"
                          cover={
                            <div className="relative h-48 overflow-hidden">
                              <img
                                alt={
                                  product.images?.[0]?.altText || product.name
                                }
                                src={
                                  product.images?.[0]?.imageUrl ||
                                  "/placeholder-image.jpg"
                                }
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/placeholder-image.jpg";
                                }}
                              />
                            </div>
                          }
                        >
                          <Card.Meta
                            description={
                              <div className="flex flex-col h-full">
                                <Text className="line-clamp-2 font-sans text-black text-left">
                                  {product.name}
                                </Text>
                                <div className="w-full text-left mt-3">
                                  <Text className="text-blackfont-sans font-semibold">
                                    ${product.price?.toFixed(2)}
                                  </Text>
                                </div>
                                <div className="flex flex-col text-sm mt-3 space-y-1">
                                  {/* Rating and Sold */}
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                      <span className="mr-1 text-yellow-500">
                                        <StarFilled />
                                      </span>
                                      <span className="text-black font-sans font-medium">
                                        {product.rating?.toFixed(1) || "5.0"}
                                      </span>
                                    </div>
                                    <span className="text-gray-500 font-sans">
                                      |
                                    </span>
                                    <span className="text-gray-700 font-sans font-thin">
                                      14.9k sold
                                    </span>
                                  </div>
                                  <div className="text-gray-500 font-sans text-left text-xs flex items-center gap-1">
                                    <EnvironmentOutlined className="text-xs" />
                                    <span>Ho Chi Minh City</span>
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </Card>
                        <Button
                          icon={<ShoppingCartOutlined />}
                          type="default"
                          className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 bg-white text-black font-sans font-semibold text-sm border-t border-gray-300 transition-all duration-300 rounded-none"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </Link>
                  </Col>
                ))}
              </Row>
              {/* Pagination Mock */}
              <div className="mt-4 flex items-center justify-center sm:justify-start lg:justify-end">
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700"
                  disabled
                >
                  {"<"}
                </Button>
                <Button
                  className="rounded-none bg-red-500 text-white mx-1"
                  disabled
                >
                  1
                </Button>
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700 mx-1"
                  disabled
                >
                  2
                </Button>
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700 mx-1"
                  disabled
                >
                  3
                </Button>
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700 mx-1"
                  disabled
                >
                  4
                </Button>
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700 mx-1"
                  disabled
                >
                  5
                </Button>
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700 mx-1"
                  disabled
                >
                  ...
                </Button>
                <Button
                  className="rounded-none text-gray-500 bg-transparent border-none hover:text-gray-700"
                  disabled
                >
                  {">"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && !error && products.length === 0 && (
        <Empty
          description={<span className="text-gray-500">No products found</span>}
          className="my-12"
        />
      )}
      {products.length !== 0 && (
        <Drawer
          title="Filters"
          placement="right"
          onClose={toggleFilterDrawer}
          open={isFilterDrawerVisible}
          width={300}
        >
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Drawer>
      )}
    </div>
  );
};

export default SearchPage;
