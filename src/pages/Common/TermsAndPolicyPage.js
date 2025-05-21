import React, { useState } from "react";
import { Menu, Typography, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;
const { SubMenu } = Menu;

// Sidebar Navigation Component
const Sidebar = ({ selectedKey, handleMenuClick, visible, setVisible }) => (
  <Drawer
    title="Policies"
    placement="left"
    onClose={() => setVisible(false)}
    visible={visible}
    className="lg:hidden"
    bodyStyle={{ padding: 0 }}
    width={280}
  >
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={(e) => {
        handleMenuClick(e);
        setVisible(false); // Close drawer on item click
      }}
      className="border-0"
    >
      <Menu.Item
        key="terms"
        className="text-gray-800 text-lg font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
      >
        Terms of Service
      </Menu.Item>
      <Menu.Item
        key="privacy"
        className="text-gray-800 text-lg font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
      >
        Privacy Policy
      </Menu.Item>
      <SubMenu
        key="sub1"
        title="Additional Policies"
        className="text-gray-800 text-lg font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
      >
        <Menu.Item
          key="shipping"
          className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
        >
          Shipping Policy
        </Menu.Item>
        <Menu.Item
          key="returns"
          className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
        >
          Return Policy
        </Menu.Item>
      </SubMenu>
    </Menu>
  </Drawer>
);

// Desktop Sidebar Component
const DesktopSidebar = ({ selectedKey, handleMenuClick }) => (
  <motion.div
    className="hidden lg:block w-80 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
  >
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
      className="border-0"
    >
      <Menu.Item
        key="terms"
        className="text-gray-800 text-lg font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
      >
        Terms of Service
      </Menu.Item>
      <Menu.Item
        key="privacy"
        className="text-gray-800 text-lg font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
      >
        Privacy Policy
      </Menu.Item>
      <SubMenu
        key="sub1"
        title="Additional Policies"
        className="text-gray-800 text-lg font-medium hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
      >
        <Menu.Item
          key="shipping"
          className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
        >
          Shipping Policy
        </Menu.Item>
        <Menu.Item
          key="returns"
          className="text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
        >
          Return Policy
        </Menu.Item>
      </SubMenu>
    </Menu>
  </motion.div>
);

// Content Section Component
const ContentSection = ({ selectedKey }) => {
  const contentMap = {
    terms: {
      title: "Terms of Service",
      intro:
        "Xbensieve.inc is committed to protecting your personal information when you access our website. Please read the Terms of Service below to understand your rights and obligations.",
      sections: [
        {
          title: "1. Acceptance of Terms",
          text: "By accessing or using Xbensieve.inc, you agree to be bound by these Terms of Service. This includes agreeing to our policies on orders, payments, and usage of our services. If you do not agree, please refrain from using our website.",
        },
        {
          title: "2. Product Information and Pricing",
          text: "We strive to ensure that all product descriptions, images, and pricing are accurate. However, Xbensieve.inc does not guarantee that all information is error-free. We reserve the right to modify or update information at any time without prior notice.",
        },
        {
          title: "3. Orders and Payments",
          text: "When placing an order, you agree to provide accurate personal information (e.g., name, email, phone number, address). Xbensieve.inc is not responsible for errors due to incorrect information provided by you. All payments must be completed before order fulfillment.",
        },
        {
          title: "4. Intellectual Property",
          text: "All content on Xbensieve.inc, including images, text, and designs, is protected by intellectual property laws. Unauthorized use, reproduction, or distribution is prohibited without prior written consent.",
        },
        {
          title: "5. Governing Law",
          text: "These Terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from your use of our services will be resolved in the courts of [Your Jurisdiction].",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      intro:
        "Xbensieve.inc is committed to safeguarding your personal information. Below is our Privacy Policy outlining how we collect, use, and protect your data.",
      sections: [
        {
          title: "1. Information We Collect",
          text: "We collect personal information such as your name, email, phone number, and address when you register, place an order, or contact us. We also collect browsing data through cookies to improve your shopping experience.",
        },
        {
          title: "2. Use of Information",
          text: "Your information is used to process orders, provide customer support, and send promotional updates (if you opt-in). We do not sell your data to third parties, but we may share it with trusted partners for order fulfillment purposes.",
        },
        {
          title: "3. Data Security",
          text: "We implement robust security measures to protect your data. However, no online system is entirely secure, and we cannot guarantee absolute security against unauthorized access.",
        },
        {
          title: "4. Cookies and Tracking",
          text: "We use cookies to enhance website functionality and analyze user behavior. You can manage cookie preferences through your browser settings.",
        },
        {
          title: "5. Your Rights",
          text: "You have the right to access, update, or request deletion of your personal data. Contact us to exercise these rights or to opt-out of marketing communications.",
        },
      ],
    },
    shipping: {
      title: "Shipping Policy",
      intro:
        "Xbensieve.inc provides reliable shipping services. Below are the details of our shipping process.",
      sections: [
        {
          title: "1. Shipping Regions",
          text: "We ship to various regions as specified during checkout. Shipping fees and delivery times vary based on your location.",
        },
        {
          title: "2. Delivery Time",
          text: "Orders are typically processed within 1-3 business days. Delivery times may vary depending on the shipping method and destination.",
        },
      ],
    },
    returns: {
      title: "Return Policy",
      intro:
        "Xbensieve.inc offers a hassle-free return process for eligible items. Please review our policy below.",
      sections: [
        {
          title: "1. Return Eligibility",
          text: "Items can be returned within 30 days of purchase if they are unused, in their original packaging, and in resalable condition.",
        },
        {
          title: "2. Return Process",
          text: "To initiate a return, contact our support team with your order details. Customers are responsible for return shipping costs unless the item is defective.",
        },
      ],
    },
  };

  const { title, intro, sections } = contentMap[selectedKey];

  return (
    <div className="space-y-8">
      <Title
        level={2}
        className="text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold !mb-6 text-left"
      >
        {title}
      </Title>
      <Paragraph className="text-gray-600 text-base sm:text-lg leading-relaxed text-left">
        {intro}
      </Paragraph>
      {sections.map((section, index) => (
        <div key={index} className="space-y-2">
          <Title
            level={4}
            className="text-gray-900 text-lg sm:text-xl font-semibold !mb-2 text-left"
          >
            {section.title}
          </Title>
          <Paragraph className="text-gray-600 text-base sm:text-lg leading-relaxed text-left">
            {section.text}
          </Paragraph>
        </div>
      ))}
    </div>
  );
};

// Main Terms and Policy Page Component
const TermsAndPolicyPage = () => {
  const [selectedKey, setSelectedKey] = useState("terms");
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <motion.section
      className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8 sm:py-12 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between lg:hidden mb-4">
          <Title level={3} className="text-gray-900 text-xl font-bold">
            Policies
          </Title>
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setVisible(true)}
            className="bg-blue-600 hover:bg-blue-700 border-none"
          >
            Menu
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <DesktopSidebar
            selectedKey={selectedKey}
            handleMenuClick={handleMenuClick}
          />
          <Sidebar
            selectedKey={selectedKey}
            handleMenuClick={handleMenuClick}
            visible={visible}
            setVisible={setVisible}
          />
          <motion.div
            className="w-full lg:flex-1 bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          >
            <ContentSection selectedKey={selectedKey} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default TermsAndPolicyPage;
