import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { FilterOutlined } from "@ant-design/icons";
import productApi from "../../api/productApi";
import FilterSidebar from "../../components/FilterSideBar";

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
          <Title level={2} className="!text-2xl sm:!text-3xl">
            Search results for:{" "}
            <span className="text-indigo-600">{keyword || "All Products"}</span>
          </Title>
          <Button
            className="lg:hidden"
            icon={<FilterOutlined />}
            onClick={toggleFilterDrawer}
          >
            Filters
          </Button>
        </div>

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

            {!loading && !error && products.length === 0 && (
              <Empty
                description={
                  <span className="text-gray-500">
                    No products found for "{keyword}"
                  </span>
                }
                className="my-12"
              />
            )}

            <Row gutter={[16, 16]}>
              {products.map((product) => (
                <Col xs={12} sm={12} md={8} lg={6} key={product._id}>
                  <Card
                    hoverable
                    className="h-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    cover={
                      <div className="relative h-48 overflow-hidden">
                        <img
                          alt={product.images?.[0]?.altText || product.name}
                          src={
                            product.images?.[0]?.imageUrl ||
                            "/placeholder-image.jpg"
                          }
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg";
                          }}
                        />
                      </div>
                    }
                  >
                    <Card.Meta
                      title={
                        <Text strong className="line-clamp-1">
                          {product.name}
                        </Text>
                      }
                      description={
                        <div className="space-y-2">
                          <Text strong className="text-indigo-600">
                            ${product.price?.toFixed(2)}
                          </Text>
                          <Text type="secondary" className="line-clamp-2">
                            {product.description}
                          </Text>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      <Drawer
        title="Filters"
        placement="right"
        onClose={toggleFilterDrawer}
        open={isFilterDrawerVisible}
        width={300}
      >
        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      </Drawer>
    </div>
  );
};

export default SearchPage;
