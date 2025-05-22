import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Spin,
  Alert,
  Typography,
  Button,
  Row,
  Col,
  Image,
  Badge,
  InputNumber,
  Radio,
  message,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import productApi from "../../api/productApi";
import cartApi from "../../api/cartApi";
const { Title, Text } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockStatus, setStockStatus] = useState(null);
  const [availableStock, setAvailableStock] = useState(0);

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

        const variations = fetchedProduct.variations || [];
        if (variations.length > 0) {
          setSelectedVariation(variations[0]._id);
          setStockStatus(
            variations[0].stock_quantity > 0 ? "In Stock" : "Out of Stock"
          );
          setAvailableStock(variations[0].stock_quantity);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleVariationChange = (e) => {
    const variationId = e.target.value;
    setSelectedVariation(variationId);
    const variation = product.variations.find((v) => v._id === variationId);
    setStockStatus(variation.stock_quantity > 0 ? "In Stock" : "Out of Stock");
    setAvailableStock(variation.stock_quantity);
    setQuantity(1);
  };
  //Add to cart function
  const handleAddToCart = async (productId, variationId, quantity) => {
    try {
      const res = await cartApi.addToCart(productId, variationId, quantity);
      if (res.status === 200) {
        message.success("Product added to cart successfully!");
      } else {
        message.error("Failed to add product to cart");
      }
    } catch (error) {
      message.error("Error adding product to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Spin tip="Loading your luxury experience..." size="large" />
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
        className="my-12 mx-4 sm:mx-auto max-w-4xl rounded-2xl shadow-lg border-none bg-red-50"
      />
    );
  }

  if (!product) {
    return (
      <Alert
        message="Product not found"
        type="warning"
        showIcon
        className="my-12 mx-4 sm:mx-auto max-w-4xl rounded-2xl shadow-lg border-none bg-yellow-50"
      />
    );
  }

  const isOutOfStock = stockStatus === "Out of Stock";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen font-sans">
      <Row gutter={[32, 32]} className="flex flex-col lg:flex-row">
        <Col xs={24} lg={12}>
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-2xl">
            <Image
              src={selectedImage}
              alt={
                product.images?.find((img) => img.imageUrl === selectedImage)
                  ?.altText || product.name
              }
              className="object-contain max-h-[500px] w-full rounded-xl transition-opacity duration-500"
              fallback="/placeholder-image.jpg"
              preview={{ maskClassName: "rounded-xl" }}
            />
            {/* Thumbnail Carousel */}
            <div className="flex gap-3 mt-6 overflow-x-auto scrollbar-hidden">
              {(product.images || []).map((img, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-20 h-20 border-2 cursor-pointer rounded-lg transition-all duration-300 ${
                    selectedImage === img.imageUrl
                      ? "border-indigo-500 shadow-md"
                      : "border-gray-200 hover:border-indigo-300 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedImage(img.imageUrl)}
                >
                  <Image
                    src={img.imageUrl}
                    alt={img.altText || product.name}
                    className="object-cover w-full h-full rounded-lg"
                    fallback="/placeholder-image.jpg"
                    preview={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div className="flex flex-col h-full bg-white p-8 rounded-2xl shadow-lg">
            <Title
              level={3}
              className="!mb-3 font-serif text-gray-800 tracking-tight"
              style={{ fontWeight: 600 }}
            >
              {product.name}
            </Title>
            <div className="flex items-center gap-4 mb-6 bg-indigo-50 p-4 rounded-xl">
              <Text strong className="text-3xl text-gray-800 font-serif">
                ${product.price?.toFixed(2)}
              </Text>
              <Badge
                count="FLASH SALE"
                style={{
                  background: "linear-gradient(90deg, #4f46e5, #7c3aed)",
                  color: "#fff",
                  fontWeight: 500,
                }}
                className="ml-2"
              />
            </div>

            {/* Variation Selector */}
            {product.variations.length > 0 && (
              <div className="mb-6">
                <Text className="text-gray-600 font-medium">
                  Select Variation:
                </Text>
                <Radio.Group
                  onChange={handleVariationChange}
                  value={selectedVariation}
                  className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {product.variations.map((variation) => (
                    <Radio
                      key={variation._id}
                      value={variation._id}
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
                      style={{
                        background:
                          selectedVariation === variation._id
                            ? "linear-gradient(135deg, #f5f3ff, #e0e7ff)"
                            : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Text className="text-gray-800 font-medium">
                          {`${variation.size} / ${variation.color}`}
                        </Text>
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: variation.color.toLowerCase(),
                          }}
                        />
                        <Text className="text-gray-500 text-sm">
                          ({variation.stock_quantity} available)
                        </Text>
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              </div>
            )}
            <div className="mb-6">
              <Text className="text-gray-600 font-medium">Quantity:</Text>
              <div className="flex items-center gap-4 mt-3">
                <InputNumber
                  min={1}
                  max={availableStock}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  className="w-28 rounded-lg border-indigo-300 focus:border-indigo-500"
                  disabled={isOutOfStock}
                />
                <Text className="text-gray-600 font-medium">
                  {availableStock} pieces available
                </Text>
                <Text
                  className={`text-sm font-semibold ${
                    isOutOfStock ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {stockStatus}
                </Text>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="large"
                icon={<ShoppingCartOutlined />}
                className="w-full sm:w-1/2 bg-white text-gray-800 border border-indigo-300 font-semibold rounded-lg hover:bg-gradient-to-r hover:from-indigo-100 hover:to-indigo-200 hover:text-indigo-700 hover:border-indigo-500 transition-all duration-300 transform "
                disabled={isOutOfStock}
                onClick={() => {
                  handleAddToCart(product._id, selectedVariation, quantity);
                }}
              >
                Add to Cart
              </Button>
              <Button
                type="primary"
                size="large"
                className="w-full sm:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-none font-semibold rounded-lg text-white transition-all duration-300 transform "
                disabled={isOutOfStock}
              >
                Buy Now ${product.price?.toFixed(2)}
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Custom CSS */}
      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .ant-radio-inner {
          border-color: #4f46e5 !important;
        }
        .ant-radio-checked .ant-radio-inner {
          background-color: #4f46e5 !important;
          border-color: #4f46e5 !important;
        }
        .ant-radio:hover .ant-radio-inner {
          border-color: #7c3aed !important;
        }
        .ant-image-preview-img {
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
