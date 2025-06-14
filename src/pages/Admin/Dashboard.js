import React, { useContext, useState } from "react";
import {
  AppstoreOutlined,
  TagsOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  Grid,
  Avatar,
  Tooltip,
  Modal,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLogo from "../../assets/admin-icon.webp";
import { AuthContext } from "../../context/AuthContext";

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;
const { confirm } = Modal;
const adminMenu = [
  {
    key: "category",
    icon: <TagsOutlined />,
    label: <Link to="/admin/category">Manage Category</Link>,
  },
  {
    key: "product",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/product">Manage Product</Link>,
  },
  {
    key: "user",
    icon: <UserOutlined />,
    label: <Link to="/admin/user">Manage User</Link>,
  },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, setUser, logout } = useContext(AuthContext);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();
  const navigate = useNavigate();
  const pathSnippets = location.pathname.split("/").filter(Boolean);
  const selectedKey = pathSnippets[1] || "category";

  const handleLogout = () => {
    confirm({
      title: "Logout Confirmation",
      content: "Are you sure you want to logout?",
      okText: "Logout",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        logout();
        setUser(null);
        navigate("/login");
      },
      onCancel() {},
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="bg-gray-100">
      <Header className="flex items-center justify-between bg-white px-4 py-2 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          {!screens.md && (
            <Button
              type="text"
              icon={<MenuUnfoldOutlined />}
              onClick={() => setDrawerVisible(true)}
              className="text-slate-950 text-xl"
              aria-label="Open menu"
            />
          )}
          <span className="text-slate-950 font-serif font-semibold text-lg sm:text-xl">
            Admin Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Avatar src={AdminLogo} alt="Admin Logo" size={40} />
          <span className="text-slate-950 font-medium hidden sm:inline">
            {user?.username}
          </span>
          <Tooltip title="Logout">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={
                <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              }
              onClick={handleLogout}
              aria-label="Logout"
            />
          </Tooltip>
        </div>
      </Header>

      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={() => setDrawerVisible(false)}
          items={adminMenu}
        />
      </Drawer>

      <Layout hasSider>
        {screens.md && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={220}
            style={{
              position: "fixed",
              left: 0,
              top: 64,
              zIndex: 40,
              background: "#fff",
              borderRight: "1px solid #e5e7eb",
              height: "calc(100vh - 64px)",
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={adminMenu}
              style={{ height: "100%", borderRight: 0 }}
            />
          </Sider>
        )}

        <Layout
          style={{
            marginLeft: screens.md ? (collapsed ? 80 : 220) : 0,
            marginTop: 5,
            position: "relative",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Content style={{ padding: 0, margin: 0 }}>
            <div style={{ padding: 10 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </div>
          </Content>
          <Footer
            className="text-center font-inter text-gray-500 text-sm border-t bg-white"
            style={{ position: "sticky", bottom: 0 }}
          >
            XBensieve - Admin ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
