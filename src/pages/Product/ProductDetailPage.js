import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Spin,
  Alert,
  Typography,
  Button,
  Rate,
  Row,
  Col,
  Image,
  Breadcrumb,
  Badge,
  Select,
  InputNumber,
} from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import productApi from "../../api/productApi";

const { Title, Text } = Typography;
const { Option } = Select;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockStatus, setStockStatus] = useState(null);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await productApi.getProductById(id);
        const fetchedProduct = res.data;
        setProduct(fetchedProduct);
        setSelectedImage(
          fetchedProduct.images?.[0]?.imageUrl || "/placeholder-image.jpg"
        );

        // Initialize default selections and stock
        const variations = fetchedProduct.variations || [];
        if (variations.length > 0) {
          setSelectedSize(variations[0].size);
          setSelectedColor(variations[0].color);
          setStockStatus(
            variations[0].stock_quantity > 0 ? "In Stock" : "Out of Stock"
          );
          const total = variations.reduce(
            (sum, v) => sum + v.stock_quantity,
            0
          );
          setTotalStock(total);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle size and color selection
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    updateStockStatus(size, selectedColor);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    updateStockStatus(selectedSize, color);
  };

  const updateStockStatus = (size, color) => {
    const variation = product?.variations?.find(
      (v) => v.size === size && v.color === color
    );
    setStockStatus(variation?.stock_quantity > 0 ? "In Stock" : "Out of Stock");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 transition-opacity duration-500 ease-in-out">
        <Spin tip="Loading product..." size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="my-12 mx-4 sm:mx-auto max-w-7xl rounded-xl shadow-md"
      />
    );
  }

  if (!product) {
    return (
      <Alert
        message="Product not found"
        type="warning"
        showIcon
        className="my-12 mx-4 sm:mx-auto max-w-7xl rounded-xl shadow-md"
      />
    );
  }

  // Extract unique sizes and colors from variations
  const sizes = [...new Set(product.variations?.map((v) => v.size))];
  const colors = [...new Set(product.variations?.map((v) => v.color))];
  const isOutOfStock = stockStatus === "Out of Stock";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen">
      <Row gutter={[32, 32]} className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <Col xs={24} lg={10}>
          <div className="bg-white p-0">
            <Image
              src={selectedImage}
              alt={
                product.images?.find((img) => img.imageUrl === selectedImage)
                  ?.altText || product.name
              }
              className="object-contain max-h-[450px] w-full transition-opacity duration-300 border border-gray-200 rounded-md"
              fallback="/placeholder-image.jpg"
              preview
            />
            {/* Thumbnail Carousel */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {(product.images || []).map((img, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-16 h-16 border-2 cursor-pointer transition-all duration-200 ${
                    selectedImage === img.imageUrl
                      ? "border-purple-500"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => setSelectedImage(img.imageUrl)}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.altText || product.name}
                    className="object-cover w-full h-full"
                    fallback="/placeholder-image.jpg"
                    preview={false}
                  />
                </div>
              ))}
            </div>
            {/* Share and Favorite */}
            <div className="flex items-center gap-3 mt-4">
              <Text className="text-gray-700">Share:</Text>
              <div className="flex gap-2">
                <Button
                  shape="circle"
                  icon={<ShareAltOutlined />}
                  className="text-gray-700 border-none hover:text-purple-600"
                />
                <Button
                  shape="circle"
                  icon={<ShareAltOutlined />}
                  className="text-gray-700 border-none hover:text-purple-600"
                />
                <Button
                  shape="circle"
                  icon={<ShareAltOutlined />}
                  className="text-gray-700 border-none hover:text-purple-600"
                />
                <Button
                  shape="circle"
                  icon={<ShareAltOutlined />}
                  className="text-gray-700 border-none hover:text-purple-600"
                />
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <HeartOutlined className="text-purple-500" />
                <Text className="text-gray-700">Favorite (18.1K)</Text>
              </div>
            </div>
          </div>
        </Col>

        {/* Product Info Section */}
        <Col xs={24} lg={14}>
          <div className="flex flex-col h-full">
            <Title level={4} className="!mb-2 font-sans text-black">
              {product.name}
            </Title>
            <div className="flex items-center gap-3 mb-3">
              <Rate
                disabled
                defaultValue={product.rating || 4.9}
                allowHalf
                className="text-sm text-purple-500"
              />
              <Text className="text-sm text-gray-700">
                {product.numReviews || "9.7K"} Ratings
              </Text>
              <Text className="text-sm text-gray-700">
                {totalStock || "39.5K"} Sold
              </Text>
            </div>
            <div className="flex items-center gap-3 mb-4 bg-gray-100 p-4 rounded-md">
              <Text delete className="text-xl text-gray-500">
                ${((product.price || 0) * 4).toFixed(2)}
              </Text>
              <Text strong className="text-2xl text-black">
                ${product.price?.toFixed(2)}
              </Text>
              <Badge
                count="FLASH SALE"
                style={{
                  background: "linear-gradient(90deg, #6b48ff, #a855f7)",
                  color: "#fff",
                }}
                className="ml-2"
              />
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-2 mb-4">
              <Text className="text-gray-700">Free Shipping:</Text>
              <Text className="text-black">Get by today</Text>
            </div>

            {/* Color Variants */}
            {colors.length > 0 && (
              <div className="mb-4">
                <Text className="text-gray-700">Color:</Text>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {colors.map((color, idx) => (
                    <div
                      key={color}
                      className={`flex items-center gap-1 border p-1 rounded cursor-pointer transition-all duration-200 ${
                        selectedColor === color
                          ? "border-purple-500"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => handleColorChange(color)}
                    >
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <Text className="text-sm text-gray-700">{color}</Text>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <Text className="text-gray-700">Size:</Text>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      type={selectedSize === size ? "primary" : "default"}
                      className={`${
                        selectedSize === size
                          ? "bg-gradient-to-r from-purple-500 to-purple-700 border-none text-white"
                          : "border-gray-300 text-gray-700"
                      } hover:bg-purple-100 hover:text-purple-700 transition-all duration-300`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <Text className="text-sm text-gray-700 mt-1 cursor-pointer hover:text-purple-600">
                  Size Chart {">"}
                </Text>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-4">
              <Text className="text-gray-700">Quantity:</Text>
              <div className="flex items-center gap-3 mt-2">
                <InputNumber
                  min={1}
                  max={totalStock}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  className="w-24 border-gray-300 rounded-md"
                />
                <Text className="text-gray-700">
                  {totalStock} pieces available
                </Text>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button
                size="large"
                icon={<ShoppingCartOutlined />}
                className="w-full sm:w-1/2 bg-white text-black border border-gray-300 font-semibold rounded hover:bg-gradient-to-r hover:from-purple-100 hover:to-purple-200 hover:text-purple-700 hover:border-purple-500 transition-all duration-300"
                disabled={isOutOfStock}
              >
                Add to Cart
              </Button>
              <Button
                type="primary"
                size="large"
                className="w-full sm:w-1/2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 border-none font-semibold rounded text-white transition-all duration-300"
                disabled={isOutOfStock}
              >
                Buy with Voucher ${product.price?.toFixed(2)}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
