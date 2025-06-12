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
import orderApi from "../../api/orderApi";
import userApi from "../../api/userApi";
import Cookies from "js-cookie";
const { Title, Text } = Typography;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockStatus, setStockStatus] = useState(null);
  const [availableStock, setAvailableStock] = useState(0);
  const token = Cookies.get("access_token");
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
  const handleBuyNow = async () => {
    if (!selectedVariation) {
      message.error("Please select a variation.");
      return;
    }
    try {
      if (!token) {
        message.warning("Please login first!");
        return;
      }
      const userData = await userApi.getUser();
      if (!userData.addresses || userData.addresses.length === 0) {
        message.warning("Please add a shipping address before checkout.");
        return;
      }
    } catch (err) {
      message.error("Failed to verify address. Please try again.");
      return;
    }
    setBuyNowLoading(true);
    try {
      const variation = product.variations.find(
        (v) => v._id === selectedVariation
      );
      const payload = {
        products: [
          {
            _id: variation._id,
            quantity,
            price: variation.price,
            product_id: product._id,
          },
        ],
      };
      const res = await orderApi.createOrder(payload);
      if (res.success && res.orderId) {
        const paymentRes = await orderApi.createPaymentUrl(res.orderId);
        if (paymentRes.success && paymentRes.paymentUrl) {
          window.location.href = paymentRes.paymentUrl;
        } else {
          message.error(paymentRes.message || "Failed to get payment URL.");
        }
      } else {
        message.error(res.message || "Failed to place order.");
      }
    } catch (error) {
      message.error(error.message || "Failed to place order.");
    } finally {
      setBuyNowLoading(false);
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
        <Col xs={24} lg={24}>
          <div className="bg-white p-8 rounded-md shadow-md ">
            <Row gutter={[32, 32]}>
              <Col xs={24} lg={12}>
                <Image
                  src={selectedImage}
                  alt={
                    product.images?.find(
                      (img) => img.imageUrl === selectedImage
                    )?.altText || product.name
                  }
                  className="object-contain max-h-[500px] w-full rounded-none"
                  fallback="/placeholder-image.jpg"
                  preview={{ maskClassName: "rounded-none" }}
                />
                <div className="flex gap-3 mt-6 overflow-x-auto scrollbar-hide">
                  {(product.images || []).map((img, idx) => (
                    <div
                      key={idx}
                      className={`flex-shrink-0 w-20 h-20 border-none cursor-pointer rounded-none ${
                        selectedImage === img.imageUrl
                          ? "border-none shadow-md"
                          : "border-none hover:shadow-sm"
                      }`}
                      onClick={() => setSelectedImage(img.imageUrl)}
                    >
                      <Image
                        src={img.imageUrl}
                        alt={img.altText || product.name}
                        className="object-cover w-full h-full rounded-none"
                        fallback="/placeholder-image.jpg"
                        preview={false}
                      />
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={24} lg={12}>
                <div className="flex flex-col h-full">
                  <Title
                    level={3}
                    className="!mb-3 font-sans text-left text-gray-800 tracking-tight"
                    style={{ fontWeight: 600 }}
                  >
                    {product.name}
                  </Title>
                  <div className="flex items-center gap-4 mb-6 bg-gray-50 p-4 rounded-none shadow-sm">
                    <Text strong className="text-3xl text-gray-800 font-sans">
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

                  {product.variations.length > 0 && (
                    <div className="mb-6 text-left">
                      <Text className="text-gray-900 font-sans text-lg">
                        Select Variation
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
                            className="flex items-center p-3 rounded-none border border-gray-200 hover:border-gray-700 hover:bg-gray-50 transition-all duration-300"
                            style={{
                              background:
                                selectedVariation === variation._id
                                  ? "rgba(150, 150, 150, 0.1)"
                                  : "transparent",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <Text className="text-gray-800 font-sans tracking-tighter">
                                {`${variation.size} / ${variation.color}`}
                              </Text>
                              <div
                                className="w-6 h-6 rounded-full border border-gray-300"
                                style={{
                                  backgroundColor:
                                    variation.color.toLowerCase(),
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
                  <div className="mb-6 text-left">
                    <Text className="text-gray-900 font-sans text-lg">
                      Quantity
                    </Text>
                    <div className="flex items-center gap-4 mt-3">
                      <InputNumber
                        min={1}
                        max={availableStock}
                        value={quantity}
                        onChange={(value) => setQuantity(value)}
                        className="w-28 border-black focus:border-black rounded-none"
                        disabled={isOutOfStock}
                      />
                      <Text className="text-gray-600 font-medium font-sans">
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
                      className="w-full sm:w-1/2 bg-white text-gray-800 border rounded-none border-black font-semibold transition-all duration-300 transform"
                      disabled={isOutOfStock}
                      onClick={() => {
                        handleAddToCart(
                          product._id,
                          selectedVariation,
                          quantity
                        );
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      type="primary"
                      size="large"
                      className="w-full sm:w-1/2 bg-black rounded-none  border-none font-semibold text-white transition-all duration-300 transform"
                      disabled={isOutOfStock || buyNowLoading}
                      loading={buyNowLoading}
                      onClick={handleBuyNow}
                    >
                      Buy Now $
                      {product.variations
                        .find((v) => v._id === selectedVariation)
                        ?.price?.toFixed(2) || product.price?.toFixed(2)}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
