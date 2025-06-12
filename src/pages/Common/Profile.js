import { useState, useEffect, useRef } from "react";
import userApi from "../../api/userApi";
import orderApi from "../../api/orderApi"; // Import the orderApi
import {
  Card,
  Button,
  Radio,
  DatePicker,
  Spin,
  Alert,
  List,
  Empty,
  message,
  Typography,
  Drawer,
  Divider,
  Input,
  Modal,
  Form,
} from "antd";
import {
  MenuOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    gender: "male",
    dob: null,
    addresses: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [editForm] = Form.useForm();
  // States for orders and pagination
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(2); // Match the limit from your API response
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
  const observerRef = useRef(null); // Ref for the intersection observer

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await userApi.getUser();
        if (response.success) {
          const { user: u, addresses } = response;
          setUser({
            username: u.username || "",
            name: `${u.first_name || ""} ${u.last_name || ""}`.trim(),
            email: u.email || "",
            phone: u.phone || "",
            gender: u.gender || "male",
            addresses: Array.isArray(addresses) ? addresses : [],
          });
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Fetch orders
  const fetchOrders = async (pageToFetch) => {
    try {
      setIsLoadingOrders(true);
      const response = await orderApi.getOrdersByUser(pageToFetch, limit);
      if (response.success) {
        setOrders((prev) =>
          pageToFetch === 1 ? response.orders : [...prev, ...response.orders]
        );
        setTotalPages(response.totalPages);
        setPage(pageToFetch);
      } else {
        setOrdersError("Failed to fetch orders");
      }
    } catch (err) {
      setOrdersError(`Failed to fetch orders: ${err.message}`);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // Initial fetch for orders
  useEffect(() => {
    fetchOrders(1);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoadingOrders &&
          page < totalPages
        ) {
          fetchOrders(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoadingOrders, page, totalPages]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setUser((prev) => ({ ...prev, dob: date }));
  };

  const handleGenderChange = (e) => {
    setUser((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        ...user,
        dob: user.dob ? user.dob.toISOString() : null,
      };
      const response = await userApi.updateUser(payload);
      if (response.success) {
        message.success("Profile saved successfully!");
      } else {
        message.error("Failed to save profile.");
      }
    } catch (err) {
      message.error("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  // Add Address
  const handleAddAddress = async (values) => {
    try {
      const response = await userApi.createAddress(values);
      if (response.success) {
        message.success("Address added successfully!");
        // Refetch user data for updated addresses
        const userRes = await userApi.getUser();
        setUser((prev) => ({
          ...prev,
          addresses: Array.isArray(userRes.addresses) ? userRes.addresses : [],
        }));
        setIsModalOpen(false);
        form.resetFields();
      } else {
        message.error(response.message || "Failed to add address.");
      }
    } catch (err) {
      message.error("An error occurred while adding address.");
    }
  };
  // Edit Address
  const handleEditClick = (address) => {
    setEditAddress(address);
    setEditModalOpen(true);
    editForm.setFieldsValue(address);
  };
  const handleEditAddress = async (values) => {
    try {
      const response = await userApi.editAddress(editAddress._id, values);
      if (response.success) {
        message.success("Address updated!");
        // Refetch user data for updated addresses
        const userRes = await userApi.getUser();
        setUser((prev) => ({
          ...prev,
          addresses: Array.isArray(userRes.addresses) ? userRes.addresses : [],
        }));
        setEditModalOpen(false);
        setEditAddress(null);
      } else {
        message.error(response.message || "Failed to update address.");
      }
    } catch (err) {
      message.error("An error occurred while updating address.");
    }
  };
  // Delete Address
  const handleDeleteAddress = (addressId) => {
    Modal.confirm({
      title: "Delete Address",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure you want to delete this address?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await userApi.deleteAddress(addressId);
          if (response.success) {
            message.success("Address deleted!");
            // Refetch user data for updated addresses
            const userRes = await userApi.getUser();
            setUser((prev) => ({
              ...prev,
              addresses: Array.isArray(userRes.addresses)
                ? userRes.addresses
                : [],
            }));
          } else {
            message.error(response.message || "Failed to delete address.");
          }
        } catch (err) {
          message.error("An error occurred while deleting address.");
        }
      },
    });
  };
  // Set as Default
  const handleSetDefault = async (addressId) => {
    try {
      const response = await userApi.setDefaultAddress(addressId);
      if (response.success) {
        message.success("Default address set!");
        // Refetch user data for updated addresses
        const userRes = await userApi.getUser();
        setUser((prev) => ({
          ...prev,
          addresses: Array.isArray(userRes.addresses) ? userRes.addresses : [],
        }));
      } else {
        message.error(response.message || "Failed to set default address.");
      }
    } catch (err) {
      message.error("An error occurred while setting default address.");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden md:block w-60 bg-white p-12 border-r border-gray-200 min-h-screen shadow-sm">
        <ul className="space-y-4 text-left">
          <li>
            <a
              href="#profile"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="#addresses"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Addresses
            </a>
          </li>
          <li>
            <a
              href="#purchases"
              className="block text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              My Purchases
            </a>
          </li>
        </ul>
      </div>

      <Drawer
        placement="left"
        onClose={toggleDrawer}
        open={isDrawerOpen}
        className="md:hidden"
        zIndex={80}
        bodyStyle={{ padding: 0, background: "#fff" }}
        headerStyle={{ borderBottom: "1px solid #e8e8e8", padding: "16px" }}
        width={240}
      >
        <ul className="space-y-4 p-6">
          <li>
            <a
              href="#profile"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={toggleDrawer}
            >
              Profile
            </a>
          </li>
          <li>
            <a
              href="#addresses"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={toggleDrawer}
            >
              Addresses
            </a>
          </li>
          <li>
            <a
              href="#purchases"
              className="block text-gray-700 hover:text-orange-500 transition-colors font-medium"
              onClick={toggleDrawer}
            >
              My Purchases
            </a>
          </li>
        </ul>
      </Drawer>
      <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-white">
        <div className="md:hidden mb-6 flex justify-start">
          <Button
            type="text"
            className="text-gray-900 hover:text-orange-500 font-medium text-lg px-3 py-2 rounded-md transition-colors duration-200"
            onClick={toggleDrawer}
            icon={<MenuOutlined className="mr-2" />}
            size="large"
          >
            Menu
          </Button>
        </div>
        <Card
          className="border border-gray-200 mb-8 shadow-sm rounded-lg"
          id="profile"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <Title level={4} className="text-gray-900 mb-2 text-left">
                My Profile
              </Title>
              <Text className="text-gray-500 text-left">
                Manage and protect your account
              </Text>
            </div>
          </div>
          <Divider
            plain
            style={{ marginTop: 24, marginBottom: 24, color: "#555" }}
          ></Divider>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Username
              </label>
              <Input
                name="username"
                value={user.username}
                onChange={handleChange}
                size="large"
                disabled
                className="w-full rounded-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                size="large"
                className="w-full rounded-none text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Email
              </label>
              <div className="flex items-center flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-none p-2 text-gray-900 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Phone Number
              </label>
              <div className="flex items-center flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-none p-2 text-gray-900 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Gender
              </label>
              <Radio.Group
                onChange={handleGenderChange}
                value={user.gender}
                className="mt-1"
              >
                <Radio value="male" className="text-gray-900">
                  Male
                </Radio>
                <Radio value="female" className="text-gray-900">
                  Female
                </Radio>
                <Radio value="other" className="text-gray-900">
                  Other
                </Radio>
              </Radio.Group>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                Date of Birth
              </label>
              <div className="flex items-center flex-col sm:flex-row gap-2">
                <DatePicker
                  value={user.dob}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300 rounded-none p-2 text-gray-900"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start">
            <button
              type="button"
              onClick={handleSave}
              className="mt-8 bg-black text-white hover:opacity-80 border-none px-6 py-2 text-lg font-serif transition-opacity duration-200 w-full"
            >
              Save
            </button>
          </div>
        </Card>

        <Card
          className="border border-gray-200 mb-8 shadow-sm rounded-xl"
          id="addresses"
          bodyStyle={{ padding: "24px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <Title level={4} className="text-gray-900 m-0">
              Addresses
            </Title>
            <button
              type="button"
              className="bg-black text-white px-4 py-2 hover:opacity-80 transition-opacity duration-200 text-sm rounded-none flex items-center gap-2"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusOutlined /> Add New Address
            </button>
          </div>
          <Divider
            plain
            style={{ marginTop: 24, marginBottom: 24, color: "#555" }}
          ></Divider>
          {user.addresses.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <tbody>
                  {user.addresses.map((address) => (
                    <tr
                      key={address._id}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <td className="py-4 pr-2 align-top w-3/4">
                        <Text className="block text-gray-800 leading-relaxed text-left">
                          {address.street}, {address.city}, {address.state},{" "}
                          {address.country} {address.postal_code}
                        </Text>

                        {address.is_default && (
                          <Text className="block text-green-600 font-medium mt-1 text-left">
                            Default Address
                          </Text>
                        )}
                      </td>
                      <td className="py-4 align-top text-right w-1/4">
                        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2">
                          <button
                            type="button"
                            className="text-sm text-blue-700"
                            onClick={() => handleEditClick(address)}
                          >
                            Edit
                          </button>
                          {!address.is_default && (
                            <button
                              type="button"
                              className="bg-white text-gray-600 px-4 py-2 border border-gray-300 hover:opacity-80 transition-opacity duration-200 text-sm rounded-none"
                              onClick={() => handleSetDefault(address._id)}
                            >
                              Set as default
                            </button>
                          )}
                          <button
                            type="button"
                            className="text-sm text-red-600"
                            onClick={() => handleDeleteAddress(address._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Empty description="No addresses found" />
            </div>
          )}
        </Card>
        {/* Add Address Modal */}
        <Modal
          title="Add New Address"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          okText="Add"
          cancelText="Cancel"
          destroyOnClose
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleAddAddress}
            initialValues={{
              street: "",
              city: "",
              state: "",
              country: "",
              postal_code: "",
            }}
          >
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please enter street" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please enter country" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postal_code"
              rules={[{ required: true, message: "Please enter postal code" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        {/* Edit Address Modal */}
        <Modal
          title="Edit Address"
          open={editModalOpen}
          onCancel={() => setEditModalOpen(false)}
          onOk={() => editForm.submit()}
          okText="Save"
          cancelText="Cancel"
          destroyOnClose
        >
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleEditAddress}
            initialValues={
              editAddress || {
                street: "",
                city: "",
                state: "",
                country: "",
                postal_code: "",
              }
            }
          >
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true, message: "Please enter street" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please enter country" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name="postal_code"
              rules={[{ required: true, message: "Please enter postal code" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Card
          className="border border-gray-200 shadow-sm rounded-lg"
          id="purchases"
          bodyStyle={{ padding: "24px" }}
        >
          <Title level={3} className="text-gray-900 mb-4">
            My Purchases
          </Title>
          {ordersError && (
            <Alert
              message={ordersError}
              type="error"
              showIcon
              className="mb-4"
            />
          )}
          {orders.length > 0 ? (
            <List
              itemLayout="vertical"
              dataSource={orders}
              renderItem={(order) => (
                <List.Item
                  key={order._id}
                  className="border-b border-gray-200 last:border-b-0 py-5 px-4 sm:px-6 hover:bg-gray-50 transition-colors duration-300 rounded-lg mb-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                        <div>
                          <Text
                            strong
                            className="text-lg sm:text-xl text-gray-900"
                          >
                            Order #{order._id.slice(-8)}
                          </Text>
                          <br />
                          <Text
                            type="secondary"
                            className="text-sm sm:text-base"
                          >
                            Placed on:{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Text>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <Text
                            className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium ${
                              order.order_status === "completed"
                                ? "bg-green-100 text-green-700"
                                : order.order_status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {order.order_status.charAt(0).toUpperCase() +
                              order.order_status.slice(1)}
                          </Text>
                        </div>
                      </div>
                      <Text className="text-lg font-semibold text-gray-900 block mb-4">
                        Total: ${order.total_amount.toFixed(2)}
                      </Text>
                      {/* Order Details */}
                      <div className="space-y-5">
                        {order.details.map((detail) => (
                          <div
                            key={detail._id}
                            className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors duration-200"
                          >
                            {/* Product Image */}
                            <div className="flex-shrink-0 relative">
                              {detail.images && detail.images.length > 0 ? (
                                <img
                                  src={detail.images[0].imageUrl}
                                  alt={
                                    detail.images[0].altText ||
                                    detail.product_id.name
                                  }
                                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/112?text=No+Image";
                                  }}
                                />
                              ) : (
                                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 shadow-sm">
                                  <Text
                                    type="secondary"
                                    className="text-xs text-center"
                                  >
                                    No Image
                                  </Text>
                                </div>
                              )}
                            </div>
                            {/* Product Details */}
                            <div className="flex-1">
                              <Text
                                strong
                                className="text-base sm:text-lg text-gray-900 hover:text-blue-600 transition-colors"
                              >
                                {detail.product_id.name}
                              </Text>
                              <br />
                              <Text type="secondary" className="text-sm">
                                {detail.variation_id.size} -{" "}
                                {detail.variation_id.color}
                              </Text>
                              <br />
                              <div className="flex items-center gap-4 mt-1">
                                <Text className="text-sm">
                                  Quantity:{" "}
                                  <span className="font-medium">
                                    {detail.quantity}
                                  </span>
                                </Text>
                                <Text className="text-sm">
                                  Price:{" "}
                                  <span className="font-medium">
                                    ${detail.price_at_purchase.toFixed(2)}
                                  </span>
                                </Text>
                              </div>
                              <Text
                                type="secondary"
                                className="text-sm block mt-2 line-clamp-3 sm:line-clamp-2"
                                title={detail.product_id.description}
                              >
                                {detail.product_id.description}
                              </Text>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex flex-col gap-2">
                      <Button
                        type="primary"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm"
                      >
                        View Details
                      </Button>
                      <Button
                        type="default"
                        className="border-gray-300 text-gray-700 hover:text-gray-900 rounded-md px-4 py-2 text-sm"
                      >
                        Track Order
                      </Button>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              description="No purchase history found"
              className="text-gray-500 py-10"
              imageStyle={{ height: 80 }}
            />
          )}
          {isLoadingOrders && (
            <div className="flex justify-center py-4">
              <Spin />
            </div>
          )}
          {page < totalPages && <div ref={observerRef} className="h-10"></div>}
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
