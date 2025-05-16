import React, { useState, useEffect } from "react";
import { Card, Button, Select, message, Tag } from "antd";
import { motion } from "framer-motion";

const { Option } = Select;

const FlashSaleComponent = () => {
  const initialTime = 1 * 3600 + 30 * 60 + 26; // 01:30:26
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    if (timeLeft <= 0) {
      message.warning("Flash Sale has ended!", 5);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const products = [
    {
      id: 1,
      name: "Red T-Shirt",
      price: 467100,
      discount: 20,
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7reod-m8dd8j25fzy882@resize_w900_nl.webp",
      category: "clothing",
    },
    {
      id: 2,
      name: "Blue T-Shirt",
      price: 503100,
      discount: 20,
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7reoe-m8d4mgrs3os63b.webp",
      category: "clothing",
    },
    {
      id: 3,
      name: "Socks",
      price: 259470,
      discount: 20,
      image:
        "https://down-vn.img.susercontent.com/file/sg-11134201-7rfg9-m9p5gfi1z0y90a.webp",
      category: "accessories",
    },
    {
      id: 4,
      name: "Baby Milk",
      price: 837000,
      discount: 15.5,
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lv1ktu81zb1649@resize_w900_nl.webp",
      category: "baby",
    },
    {
      id: 5,
      name: "Detergent",
      price: 228000,
      discount: 12.5,
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m6mf2srcs09zd2@resize_w900_nl.webp",
      category: "household",
    },
    {
      id: 6,
      name: "Grey Pants",
      price: 333150,
      discount: 25,
      image:
        "https://down-vn.img.susercontent.com/file/vn-11134201-7ra0g-m6ikn303322gf6@resize_w900_nl.webp",
      category: "clothing",
    },
  ];

  useEffect(() => {
    setFilteredProducts(
      category === "all"
        ? products
        : products.filter((p) => p.category === category)
    );
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Flash Sale{" "}
          <span className="ml-2 text-orange-500 text-2xl">
            {timeLeft > 0 ? formatTime(timeLeft) : "ENDED"}
          </span>
        </h2>
        <div className="flex items-center gap-3">
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={(value) => setCategory(value)}
          >
            <Option value="all">All Categories</Option>
            <Option value="clothing">Clothing</Option>
            <Option value="accessories">Accessories</Option>
            <Option value="baby">Baby Products</Option>
            <Option value="household">Household</Option>
          </Select>
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All Products
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl shadow-sm"
          >
            <Card
              hoverable
              cover={
                <img
                  alt={product.name}
                  src={product.image}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
              }
              className="rounded-xl border border-gray-200"
            >
              <div className="mb-3 flex justify-between items-center">
                <Tag color="red">-{product.discount}% OFF</Tag>
              </div>
              <p className="text-sm text-gray-500 mb-1">Mall</p>
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-xl font-bold text-orange-500">
                ${(product.price / 100000).toFixed(2)}
              </p>
              <Button
                type="primary"
                block
                className="mt-4 bg-yellow-500 border-none hover:bg-yellow-600"
              >
                Add to Cart
              </Button>
              <a
                href="/"
                className="block text-center mt-2 text-blue-500 hover:underline text-sm"
              >
                View Details
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleComponent;
