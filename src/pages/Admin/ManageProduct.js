import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Input,
  Button,
  Upload,
  message,
  Row,
  Col,
  Space,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ManageProduct = () => {
  const [form] = Form.useForm();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [variations, setVariations] = useState([
    { size: "", color: "", price: "", stock_quantity: "" },
  ]);
  const [images, setImages] = useState([]);
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update liveData whenever product, variations, or images change
  useEffect(() => {
    const data = {
      ...product,
      variations,
      imagePreviews: images.map((image) => URL.createObjectURL(image)),
    };
    setLiveData(data);
  }, [product, variations, images]);

  // Handle product input changes
  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle variation input changes
  const handleVariationChange = (idx, e) => {
    const updated = [...variations];
    updated[idx][e.target.name] = e.target.value;
    setVariations(updated);
  };

  // Add a new variation
  const addVariation = () => {
    setVariations([
      ...variations,
      { size: "", color: "", price: "", stock_quantity: "" },
    ]);
  };

  // Handle image uploads
  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("variations", JSON.stringify(variations));
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mjk1MTQ4MmJiYTUwYWE5ODg1ZmMzZSIsInVzZXJuYW1lIjoiT0FkbWluMjgwMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NzU1NTUyOSwiZXhwIjoxNzQ3NTU2NDI5fQ.VZ3gRDpMlz-cAs_iAJWXR37k55_hD8n2uA6h7tFxaHM",
          },
        }
      );
      message.success(
        `Product added successfully at ${new Date().toLocaleString("en-US", {
          timeZone: "Asia/Bangkok",
        })}! ${JSON.stringify(res.data)}`
      );
    } catch (err) {
      message.error(`Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle form cancellation
  const handleCancel = () => {
    form.resetFields();
    setProduct({ name: "", description: "", price: "", category_id: "" });
    setVariations([{ size: "", color: "", price: "", stock_quantity: "" }]);
    setImages([]);
    setLiveData(null);
    message.info("Operation cancelled");
  };

  // Upload props for images
  const uploadProps = {
    beforeUpload: (file) => {
      return false; // Prevent actual upload for demo
    },
    onChange: (info) => {
      if (info.fileList.length > 0) {
        setImages(info.fileList.map((file) => file.originFileObj));
      } else {
        setImages([]);
      }
    },
  };

  return (
    <div>
      <Row gutter={[24, 24]} className="flex flex-col lg:flex-row">
        {/* Left Column: Form Inputs */}
        <Col xs={24} lg={16}>
          <Card
            title="Basic Information"
            className="mb-6 shadow-lg rounded-lg bg-white"
            headStyle={{
              background: "#f8fafc",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            {/* Product Images */}
            <Form.Item label="Product Images" className="mb-6">
              <Space size={16} align="start">
                <Upload
                  {...uploadProps}
                  listType="picture-card"
                  accept="image/*"
                  className="upload-btn"
                >
                  <Button
                    icon={<UploadOutlined />}
                    className="w-full h-full flex items-center justify-center"
                  >
                    Upload
                  </Button>
                </Upload>
                <div className="text-gray-600 text-sm leading-relaxed">
                  Image aspect ratio 1:1 <br />
                  Example
                </div>
              </Space>
            </Form.Item>

            {/* Product Name */}
            <Form.Item label="Product Name" className="mb-6">
              <Input
                name="name"
                placeholder="Product name (25-100 characters)"
                value={product.name}
                onChange={handleProductChange}
                required
                className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </Form.Item>

            {/* Product Description */}
            <Form.Item label="Product Description" className="mb-6">
              <Input.TextArea
                name="description"
                placeholder="Product description"
                value={product.description}
                onChange={handleProductChange}
                required
                className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                rows={4}
              />
            </Form.Item>

            {/* Product Price */}
            <Form.Item label="Product Price" className="mb-6">
              <InputNumber
                name="price"
                placeholder="Product price"
                value={product.price}
                onChange={(value) => setProduct({ ...product, price: value })}
                required
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>

            {/* Category ID */}
            <Form.Item label="Category" className="mb-6">
              <Input
                name="category_id"
                placeholder="Category ID"
                value={product.category_id}
                onChange={handleProductChange}
                required
                className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </Form.Item>

            {/* Variations Section */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Product Variations
              </h3>
              {variations.map((v, idx) => (
                <Space
                  key={idx}
                  style={{
                    display: "flex",
                    marginBottom: 16,
                    flexWrap: "wrap",
                    gap: 16,
                  }}
                  align="baseline"
                  className="w-full"
                >
                  <Form.Item label="Size" className="flex-1 min-w-[120px]">
                    <Input
                      name="size"
                      placeholder="Size"
                      value={v.size}
                      onChange={(e) => handleVariationChange(idx, e)}
                      className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </Form.Item>
                  <Form.Item label="Color" className="flex-1 min-w-[120px]">
                    <Input
                      name="color"
                      placeholder="Color"
                      value={v.color}
                      onChange={(e) => handleVariationChange(idx, e)}
                      className="rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </Form.Item>
                  <Form.Item label="Price" className="flex-1 min-w-[120px]">
                    <InputNumber
                      name="price"
                      placeholder="Price"
                      value={v.price}
                      onChange={(value) => {
                        const updated = [...variations];
                        updated[idx].price = value;
                        setVariations(updated);
                      }}
                      className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Stock Quantity"
                    className="flex-1 min-w-[120px]"
                  >
                    <InputNumber
                      name="stock_quantity"
                      placeholder="Stock"
                      value={v.stock_quantity}
                      onChange={(value) => {
                        const updated = [...variations];
                        updated[idx].stock_quantity = value;
                        setVariations(updated);
                      }}
                      className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </Form.Item>
                </Space>
              ))}
              <Button
                type="dashed"
                onClick={addVariation}
                block
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-300"
              >
                Add Variation
              </Button>
            </div>
          </Card>
        </Col>

        {/* Right Column: Product Details */}
        <Col xs={24} lg={8}>
          <Card
            title="Product Details"
            className="shadow-lg rounded-lg bg-white"
            headStyle={{
              background: "#f8fafc",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            {liveData &&
            (liveData.name ||
              liveData.description ||
              liveData.price ||
              liveData.category_id ||
              liveData.imagePreviews.length > 0 ||
              liveData.variations.some(
                (v) => v.size || v.color || v.price || v.stock_quantity
              )) ? (
              <div className="space-y-4 text-gray-700">
                <p className="font-medium">
                  <strong>Name:</strong> {liveData.name || "N/A"}
                </p>
                <p className="font-medium">
                  <strong>Description:</strong> {liveData.description || "N/A"}
                </p>
                <p className="font-medium">
                  <strong>Price:</strong>{" "}
                  {liveData.price ? `$${liveData.price}` : "N/A"}
                </p>
                <p className="font-medium">
                  <strong>Category ID:</strong> {liveData.category_id || "N/A"}
                </p>
                <div>
                  <p className="font-medium mb-2">
                    <strong>Images:</strong>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {liveData.imagePreviews.map((preview, idx) => (
                      <img
                        key={idx}
                        src={preview}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-20 object-cover rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                </div>
                <p className="font-medium">
                  <strong>Variations:</strong> {liveData.variations.length}{" "}
                  variations available
                </p>
                <div className="space-y-3">
                  {liveData.variations.map((v, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded-md">
                      <p className="font-medium">
                        <strong>Variation {idx + 1}:</strong>
                      </p>
                      <p>Size: {v.size || "N/A"}</p>
                      <p>Color: {v.color || "N/A"}</p>
                      <p>Price: {v.price ? `$${v.price}` : "N/A"}</p>
                      <p>Stock: {v.stock_quantity || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                No product data entered yet
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <div
        className="bg-white border-t border-gray-300 px-6 py-4 flex justify-end items-center gap-4 shadow-lg z-50"
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          maxWidth: "100vw",
          minHeight: "68px",
          background: "#fff",
        }}
      >
        <Button
          onClick={handleCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Cancel
        </Button>

        <Space className="space-x-4">
          <Button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-200">
            Save & Hide
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Save & Display
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ManageProduct;
