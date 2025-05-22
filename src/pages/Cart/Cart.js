import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button, InputNumber, Card, Typography, Space, Alert } from "antd";
import cartApi from "../../api/cartApi";

const { Title, Text } = Typography;

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await cartApi.getCart();
        if (response.data.success) {
          setCart(response.data.data.cart);
        } else {
          setError("Failed to fetch cart data. Please try again.");
        }
      } catch (err) {
        setError("Error fetching cart data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // Handle quantity update
  const handleQuantityChange = async (cartItemId, value) => {
    try {
      const response = await cartApi.updateCartItem(cartItemId, {
        quantity: value,
      });
      if (response.data.success) {
        setCart(response.data.data.cart);
      } else {
        setError("Failed to update quantity.");
      }
    } catch (err) {
      setError("Error updating quantity.");
    }
  };

  // Handle item removal
  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await cartApi.removeCartItem(cartItemId);
      if (response.data.success) {
        setCart(response.data.data.cart);
      } else {
        setError("Failed to remove item.");
      }
    } catch (err) {
      setError("Error removing item.");
    }
  };

  if (loading)
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  if (error)
    return (
      <Alert
        message={error}
        type="error"
        showIcon
        className="mx-auto max-w-3xl my-8"
      />
    );
  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Alert message="Your Amazon Cart is empty." type="info" showIcon />
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Continue shopping
        </Link>
      </div>
    );

  // Calculate totals
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.variation.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1; // 10% VAT
  const discount = 0; // Placeholder for discounts
  const total = subtotal + vat - discount;

  return (
    <section className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="flex-1">
          <header className="flex justify-between items-center mb-6">
            <Title level={2} className="text-gray-900">
              Shopping Cart
            </Title>
            <Text className="text-gray-600">Price</Text>
          </header>

          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <AnimatePresence>
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.cartItemId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="flex items-center gap-4 border-gray-200 rounded-none border-t-0 border-l-0 border-r-0">
                    <Link to={`/${item.product._id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-sm object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/${item.product._id}`}>
                        <Text
                          strong
                          className="text-base text-gray-900 hover:text-blue-600"
                        >
                          {item.product.name}
                        </Text>
                      </Link>
                      <div className="mt-1 space-y-1 text-sm text-gray-600">
                        <div>
                          <Text>Size: {item.variation.size}</Text>
                        </div>
                        <div>
                          <Text>Color: {item.variation.color}</Text>
                        </div>
                        <div>
                          <Text strong className="text-base text-gray-900">
                            ${item.variation.price.toFixed(2)}
                          </Text>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) =>
                            handleQuantityChange(item.cartItemId, value)
                          }
                          id={`Line${index + 1}Qty`}
                          className="h-8 w-16 text-sm border-gray-300"
                        />
                        <Button
                          type="link"
                          danger
                          onClick={() => handleRemoveItem(item.cartItemId)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Delete
                        </Button>
                        <span className="text-gray-300">|</span>
                        <Button
                          type="link"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Save for later
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <Text strong className="text-base text-gray-900">
                        ${(item.variation.price * item.quantity).toFixed(2)}
                      </Text>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </Space>
        </div>

        {/* Summary Box */}
        <motion.div
          className="lg:w-80 bg-gray-50 p-4 rounded-md sticky top-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <Text className="text-sm text-gray-700">
              Subtotal ({cart.items.length} item
              {cart.items.length !== 1 ? "s" : ""}):{" "}
              <Text strong>${subtotal.toFixed(2)}</Text>
            </Text>
            <div className="flex justify-between text-sm text-gray-700">
              <Text>Estimated Tax (VAT):</Text>
              <Text>${vat.toFixed(2)}</Text>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <Text>Discount:</Text>
                <Text>-${discount.toFixed(2)}</Text>
              </div>
            )}
            <div className="flex justify-between text-base font-medium text-gray-900">
              <Text strong>Total:</Text>
              <Text strong>${total.toFixed(2)}</Text>
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-sm"
            >
              Proceed to Checkout
            </Button>
            <div className="text-center">
              <Button
                type="link"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Continue shopping
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
