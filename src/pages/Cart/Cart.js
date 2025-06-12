import React, { useState, useEffect, useContext, useRef } from "react";
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
  Checkbox,
  Empty,
} from "antd";
import cartApi from "../../api/cartApi";
import { AuthContext } from "../../context/AuthContext";
import Cookies from "js-cookie";
import decodeAccessToken from "../../utils/decodeJwt";
import orderApi from "../../api/orderApi";
import userApi from "../../api/userApi";

const { Title, Text } = Typography;

const Cart = () => {
  const { user, setUser } = useContext(AuthContext);
  const [checkoutLoading, setCheckoutLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]); // Track selected item IDs
  const informedRef = useRef(false);
  const token = Cookies.get("access_token");

  // Handle authentication and user setup
  useEffect(() => {
    if (token) {
      const decodedToken = decodeAccessToken(token);
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        role: decodedToken.role,
      });
    }
  }, [token, setUser]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !informedRef.current && !token) {
      message.info("Please log in to view your cart.");
      informedRef.current = true;
      navigate("/login");
    }
  }, [user, navigate, token]);

  // Fetch cart data and initialize selected items
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await cartApi.getCart();
        if (response.data.success) {
          setCart(response.data.data.cart);
          // Initialize all items as selected by default
          setSelectedItems(
            response.data.data.cart.items.map((item) => item.cartItemId)
          );
        } else {
          setError("Failed to fetch cart data.");
        }
      } catch (err) {
        setError("Error fetching cart data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [user]);

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      const response = await cartApi.updateCartItem(cartItemId, quantity);
      if (response.data.success) {
        setCart(response.data.data.cart);
      } else {
        setError("Failed to update quantity.");
      }
    } catch (err) {
      setError("Error updating quantity.");
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await cartApi.removeCartItem(cartItemId);
      if (response.data.success) {
        setCart(response.data.data.cart);
        setSelectedItems((prev) => prev.filter((id) => id !== cartItemId));
      } else {
        setError("Failed to remove item.");
      }
    } catch (err) {
      setError("Error removing item.");
    }
  };

  const handleCheckboxChange = (cartItemId) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(cart.items.map((item) => item.cartItemId));
    } else {
      setSelectedItems([]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 text-center">
        <Empty
          description="There are no items in your shopping cart"
          className="text-gray-500 py-10"
          imageStyle={{ height: 80 }}
        />
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const selectedCartItems = cart.items.filter((item) =>
    selectedItems.includes(item.cartItemId)
  );
  const subtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.variation.price * item.quantity,
    0
  );
  const vat = subtotal * 0.1;
  const discount = 0;
  const total = subtotal + vat - discount;

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      message.warning(
        "Please select at least one item to proceed to checkout."
      );
      return;
    }
    try {
      const userData = await userApi.getUser();
      if (!userData.addresses || userData.addresses.length === 0) {
        message.warning("Please add a shipping address before checkout.");
        return;
      }
    } catch (err) {
      message.error("Failed to verify address. Please try again.");
      return;
    }
    setCheckoutLoading(true);
    try {
      const res = await orderApi.createOrderByCart({
        cartItemIds: selectedItems,
      });
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
      setCheckoutLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 lg:flex lg:gap-8">
      <div className="flex-1 mb-6 lg:mb-0 font-inter text-right lg:text-left">
        <div className="flex justify-between items-center mb-4">
          <Title level={2} className="text-xl font-bold text-gray-900">
            Shopping Cart
          </Title>
          <Checkbox
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={selectedItems.length === cart.items.length}
            indeterminate={
              selectedItems.length > 0 &&
              selectedItems.length < cart.items.length
            }
          >
            Select All
          </Checkbox>
        </div>
        <Space direction="vertical" size="middle" className="w-full">
          <AnimatePresence>
            {cart.items.map((item, index) => (
              <motion.div
                key={item.cartItemId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="border-b border-gray-200 py-4"
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedItems.includes(item.cartItemId)}
                    onChange={() => handleCheckboxChange(item.cartItemId)}
                    className="mt-1"
                  />
                  <Link to={`/search/${item.product._id}`}>
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex-1">
                    <Link to={`/search/${item.product._id}`}>
                      <Text className="text-base font-medium text-gray-900 hover:text-blue-600">
                        {item.product.name}
                      </Text>
                    </Link>
                    <div className="mt-1 text-sm text-gray-600 space-y-0.5">
                      <div>Size: {item.variation.size}</div>
                      <div>Color: {item.variation.color}</div>
                      <div>Unit price: ${item.variation.price.toFixed(2)}</div>
                      <div>
                        <Text className="text-base font-semibold text-gray-900">
                          Total: $
                          {(item.variation.price * item.quantity).toFixed(2)}
                        </Text>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <InputNumber
                        min={1}
                        value={item.quantity}
                        onChange={(value) =>
                          handleQuantityChange(item.cartItemId, value)
                        }
                        id={`Line${index + 1}Qty`}
                        className="w-16"
                        size="small"
                      />
                      <Button
                        type="link"
                        danger
                        onClick={() => handleRemoveItem(item.cartItemId)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Space>
      </div>

      <motion.div
        className="lg:w-80 bg-gray-100 p-4 rounded-lg shadow-sm lg:sticky lg:top-4 fixed bottom-0 left-0 right-0 z-10 lg:z-0 lg:bottom-auto lg:right-auto lg:left-auto lg:mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700 text-sm">
            <Text>
              Subtotal ({selectedCartItems.length} item
              {selectedCartItems.length !== 1 ? "s" : ""}):
            </Text>
            <Text className="font-semibold">${subtotal.toFixed(2)}</Text>
          </div>
          <div className="flex justify-between text-gray-700 text-sm">
            <Text>Estimated Tax (VAT):</Text>
            <Text>${vat.toFixed(2)}</Text>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600 text-sm">
              <Text>Discount:</Text>
              <Text>-${discount.toFixed(2)}</Text>
            </div>
          )}
          <div className="flex justify-between text-base font-semibold text-gray-900">
            <Text>Total:</Text>
            <Text>${total.toFixed(2)}</Text>
          </div>
          <Button
            type="primary"
            size="large"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-md mt-4"
            onClick={handleCheckout}
            loading={checkoutLoading}
          >
            Proceed to Checkout
          </Button>
          <div className="text-center mt-2">
            <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
              Continue shopping
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Cart;
