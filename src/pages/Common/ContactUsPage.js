import React from "react";
import { Form, Input, Button } from "antd";
import { motion } from "framer-motion";

const ContactUsPage = () => {
  const handleSubmit = (values) => {
    console.log("Form values:", values);
    // Add form submission logic here
  };

  return (
    <motion.section
      className="bg-white min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="py-12 lg:py-20 px-6 mx-auto max-w-screen-lg">
        <motion.h2
          className="mb-6 text-4xl text-center text-gray-900 font-inter font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
        <motion.p
          className="mb-10 text-center text-lg font-light text-gray-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Got questions about our latest clothing collection? Need help with
          your order? We’re here to help you every step of the way.
        </motion.p>
        <motion.div
          className="p-8 rounded-xl shadow-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Form layout="vertical" onFinish={handleSubmit} className="space-y-6">
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-900">
                  Your Email
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                placeholder="yourname@example.com"
                className="w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-900">
                  Subject
                </span>
              }
              name="subject"
              rules={[{ required: true, message: "Please enter a subject" }]}
            >
              <Input
                placeholder="Let us know how we can assist you"
                className="w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-900">
                  Your Message
                </span>
              }
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Leave your comment or question here..."
                className="w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="text-sm font-medium text-gray-900">
                  Order Number (if applicable)
                </span>
              }
              name="orderNumber"
            >
              <Input
                placeholder="Enter your order number"
                className="w-full p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500"
              />
            </Form.Item>
            <Form.Item>
              <div className="flex justify-center">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="inline-flex items-center py-3 px-6 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 transition duration-300"
                  >
                    Submit
                  </Button>
                </motion.div>
              </div>
            </Form.Item>
          </Form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactUsPage;
