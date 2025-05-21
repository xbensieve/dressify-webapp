import React, { useState, useEffect } from "react";
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
  Select,
  Descriptions,
  Empty,
  Image,
  Modal,
} from "antd";
import { motion } from "framer-motion";
import { UploadOutlined } from "@ant-design/icons";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
import validateProductForm from "../../utils/validateProductForm";

const { confirm } = Modal;

const ManageProduct = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

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

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  //add data for colors and sizes
  useEffect(() => {
    const fetchColorsAndSizes = async () => {
      try {
        const color = [
          "Red",
          "Blue",
          "Green",
          "Yellow",
          "Black",
          "White",
          "Pink",
          "Purple",
          "Orange",
          "Gray",
          "Brown",
          "Cyan",
          "Magenta",
          "Lime",
          "Teal",
          "Navy",
          "Maroon",
          "Olive",
          "Coral",
          "Salmon",
        ];
        const size = ["S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL", "6XL"];
        setColors(color);
        setSizes(size);
      } catch (error) {
        console.error("Error fetching colors and sizes:", error);
      }
    };
    fetchColorsAndSizes();
  }, []);
  // Handle category selection
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setProduct({ ...product, category_id: value });
  };

  useEffect(() => {
    const data = {
      ...product,
      variations,
      imagePreviews: images.map((image) => URL.createObjectURL(image)),
    };
    //display category name instead of id
    const category = categories.find((cat) => cat._id === product.category_id);
    if (category) {
      data.category_id = category.name;
    }
    setLiveData(data);
  }, [product, variations, images, categories]);

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariationChange = (idx, e) => {
    const updated = [...variations];
    updated[idx][e.target.name] = e.target.value;
    setVariations(updated);
  };

  const addVariation = () => {
    setVariations([
      ...variations,
      { size: "", color: "", price: "", stock_quantity: "" },
    ]);
  };

  const handleSubmit = async () => {
    if (
      !validateProductForm(
        product,
        images,
        variations,
        selectedCategory,
        message
      )
    )
      return;

    // Confirm before submitting
    confirm({
      title: "Confirm Submission",
      content: "Are you sure you want to add this product?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk: async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("product", JSON.stringify(product));
        formData.append("variations", JSON.stringify(variations));
        images.forEach((img) => formData.append("images", img));
        try {
          const response = await productApi.addProduct(formData);
          if (response.success === true) {
            message.success("Product added successfully");
            form.resetFields();
            setProduct({
              name: "",
              description: "",
              price: "",
              category_id: "",
            });
            setVariations([
              { size: "", color: "", price: "", stock_quantity: "" },
            ]);
            setImages([]);
            setSelectedCategory(null);
            setLiveData(null);
            return;
          } else {
            message.error(response.message);
            return;
          }
        } catch (err) {
          message.error(`Error: ${err.response?.data?.message || err.message}`);
        } finally {
          setLoading(false);
        }
      },
      onCancel() {
        message.info("Submission cancelled");
      },
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setProduct({ name: "", description: "", price: "", category_id: "" });
    setVariations([{ size: "", color: "", price: "", stock_quantity: "" }]);
    setImages([]);
    setSelectedCategory(null);
    setLiveData(null);
    message.info("Operation cancelled");
  };

  const uploadProps = {
    beforeUpload: (file) => {
      return false;
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
            className="mb-6 shadow-lg rounded-lg bg-white font-mono"
            headStyle={{
              background: "#f8fafc",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            {/* Product Images */}
            <Form.Item
              label="Product Images"
              name="productImages"
              className="mb-6"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one product image!",
                },
              ]}
            >
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
              <Select
                placeholder="Select a category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                options={categories.map((category) => ({
                  label: category.name,
                  value: category._id,
                }))}
                required
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
                    <Select
                      name="size"
                      placeholder="Select size"
                      value={v.size}
                      onChange={(value) => {
                        const updated = [...variations];
                        updated[idx].size = value;
                        setVariations(updated);
                      }}
                      className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      options={sizes.map((size) => ({
                        label: size,
                        value: size,
                      }))}
                      required
                    />
                  </Form.Item>
                  <Form.Item label="Color" className="flex-1 min-w-[120px]">
                    <Select
                      name="color"
                      placeholder="Select color"
                      value={v.color}
                      onChange={(value) => {
                        const updated = [...variations];
                        updated[idx].color = value;
                        setVariations(updated);
                      }}
                      className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      options={colors.map((color) => ({
                        label: color,
                        value: color,
                      }))}
                      required
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
                  <Button
                    danger
                    type="link"
                    onClick={() => {
                      if (variations.length > 1) {
                        setVariations(variations.filter((_, i) => i !== idx));
                      }
                    }}
                    disabled={variations.length === 1}
                    style={{ alignSelf: "center", padding: 0 }}
                  >
                    Delete
                  </Button>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-6 text-gray-700"
              >
                {/* Product Details */}
                <Descriptions
                  title="Product Information"
                  bordered
                  column={1}
                  className="bg-white rounded-lg shadow-sm"
                  labelStyle={{ fontWeight: 500, color: "#374151" }}
                  contentStyle={{ color: "#4b5563" }}
                >
                  <Descriptions.Item label="Name">
                    {liveData.name || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {liveData.description || "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Price">
                    {liveData.price ? `$${liveData.price}` : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Category  ">
                    {liveData.category_id || "N/A"}
                  </Descriptions.Item>
                </Descriptions>

                {/* Image Previews */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Images
                  </h3>
                  {liveData.imagePreviews?.length > 0 ? (
                    <Image.PreviewGroup>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {liveData.imagePreviews.map((preview, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          >
                            <Image
                              src={preview}
                              alt={`Preview ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </Image.PreviewGroup>
                  ) : (
                    <Empty description="No images available" />
                  )}
                </div>

                {/* Variations */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Variations ({liveData.variations?.length || 0} available)
                  </h3>
                  {liveData.variations?.length > 0 ? (
                    <div className="space-y-4">
                      {liveData.variations.map((v, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <Card
                            title={`Variation ${idx + 1}`}
                            className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <Descriptions
                              column={1}
                              size="small"
                              bordered={false}
                            >
                              <Descriptions.Item label="Size">
                                {v.size || "N/A"}
                              </Descriptions.Item>
                              <Descriptions.Item label="Color">
                                {v.color || "N/A"}
                              </Descriptions.Item>
                              <Descriptions.Item label="Price">
                                {v.price ? `$${v.price}` : "N/A"}
                              </Descriptions.Item>
                              <Descriptions.Item label="Stock">
                                {v.stock_quantity || "N/A"}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <Empty description="No variations available" />
                  )}
                </div>
              </motion.div>
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
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Save
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ManageProduct;
