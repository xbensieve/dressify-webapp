import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  InputNumber,
  Typography,
  Space,
  Alert,
  message,
  Spin,
} from "antd";
import cartApi from "../../api/cartApi";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import decodeAccessToken from "../../utils/decodeJwt";

const { Title, Text } = Typography;

const Cart = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const informedRef = React.useRef(false);
  const token = Cookies.get("access_token");

  // Handle authentication and user setup
  useEffect(() => {
    if (token) {
      const decodedToken = decodeAccessToken(token);
      const userInfo = {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        role: decodedToken.role,
      };
      setUser(userInfo);
    }
  }, [token, setUser]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !informedRef.current && !token) {
      message.info("You need to be logged in to view your cart.");
      informedRef.current = true;
      navigate("/login");
    }
  }, [user, navigate, token]);

  // Fetch cart data
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
  }, [user]);

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

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  // Empty cart state
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <Alert message="Your cart is empty." type="info" showIcon />
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  // Calculate totals
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.variation.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1; // 10% VAT
  const discount = 0; // Placeholder for discounts
  const total = subtotal + vat - discount;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <header className="flex justify-between items-center mb-6">
            <Title level={2} className="text-2xl font-bold text-gray-900">
              Shopping Cart
            </Title>
            <Text className="text-gray-600 hidden sm:block">Price</Text>
          </header>

          <Space direction="vertical" size="large" className="w-full">
            <AnimatePresence>
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.cartItemId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-200 pb-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link to={`/search/${item.product._id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-md object-cover"
                      />
                    </Link>
                    <div className="flex-1">
                      <Link to={`/search/${item.product._id}`}>
                        <Text className="text-lg font-medium text-gray-900 hover:text-blue-600">
                          {item.product.name}
                        </Text>
                      </Link>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div>Size: {item.variation.size}</div>
                        <div>Color: {item.variation.color}</div>
                        <div>Unit price: {item.variation.price}</div>
                        <div className="sm:hidden">
                          <Text className="text-base font-semibold text-gray-900">
                            ${(item.variation.price * item.quantity).toFixed(2)}
                          </Text>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center gap-3">
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) =>
                            handleQuantityChange(item.cartItemId, value)
                          }
                          id={`Line${index + 1}Qty`}
                          className="w-16"
                        />
                        <Button
                          type="link"
                          danger
                          onClick={() => handleRemoveItem(item.cartItemId)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                      <Text className="text-base font-semibold text-gray-900">
                        ${(item.variation.price * item.quantity).toFixed(2)}
                      </Text>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </Space>
        </div>

        {/* Summary */}
        <motion.div
          className="lg:w-96 bg-gray-100 p-6 rounded-lg shadow-sm sticky top-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <Text>
                Subtotal ({cart.items.length} item
                {cart.items.length !== 1 ? "s" : ""}):
              </Text>
              <Text className="font-semibold">${subtotal.toFixed(2)}</Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text>Estimated Tax (VAT):</Text>
              <Text>${vat.toFixed(2)}</Text>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <Text>Discount:</Text>
                <Text>-${discount.toFixed(2)}</Text>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold text-gray-900">
              <Text>Total:</Text>
              <Text>${total.toFixed(2)}</Text>
            </div>
            <Button
              type="primary"
              size="large"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-md"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
            <div className="text-center">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cart;
