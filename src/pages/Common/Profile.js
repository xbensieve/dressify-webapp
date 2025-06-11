import { useState, useEffect } from "react";
import userApi from "../../api/userApi";
import {
  Card,
  Button,
  Radio,
  DatePicker,
  Upload,
  Spin,
  Alert,
  List,
  Empty,
  message,
  Typography,
  Drawer,
  Divider,
  Input,
} from "antd";
import { UploadOutlined, MenuOutlined } from "@ant-design/icons";

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

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed.`);
    }
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
        title={user.username || "User"}
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
        <div className="md:hidden mb-6">
          <Button
            type="text"
            className="text-gray-900 hover:text-orange-500"
            onClick={toggleDrawer}
            icon={<MenuOutlined />}
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
              className="bg-black text-white px-4 py-2 hover:opacity-80 transition-opacity duration-200 text-sm rounded-none"
            >
              + Add New Address
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

                      {/* Actions Column */}
                      <td className="py-4 align-top text-right w-1/4">
                        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-2">
                          <button
                            type="button"
                            className="text-sm text-blue-700"
                          >
                            Edit
                          </button>
                          {!address.is_default && (
                            <button
                              type="button"
                              className="bg-white text-gray-600 px-4 py-2 border border-gray-300 hover:opacity-80 transition-opacity duration-200 text-sm rounded-none"
                            >
                              Set as default
                            </button>
                          )}
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

        <Card
          className="border border-gray-200 shadow-sm rounded-lg"
          id="purchases"
          bodyStyle={{ padding: "24px" }}
        >
          <Title level={3} className="text-gray-900 mb-4">
            My Purchases
          </Title>
          <Empty
            description="No purchase history found"
            className="text-gray-500"
          />
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
