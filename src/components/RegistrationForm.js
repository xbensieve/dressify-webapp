import { useState } from "react";
import { Form, Input, Row, Col, DatePicker, Alert } from "antd";
import { AnimatePresence, motion } from "framer-motion";

const stepVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    position: "absolute",
    width: "100%",
  }),
  animate: {
    opacity: 1,
    x: 0,
    position: "relative",
    width: "100%",
    transition: { duration: 0.4 },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -100 : 100,
    position: "absolute",
    width: "100%",
    transition: { duration: 0.4 },
  }),
};

const RegistrationForm = ({ onFinish, error }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev
  const [form] = Form.useForm();

  const next = async () => {
    try {
      if (currentStep === 0) {
        await form.validateFields(["first_name", "last_name"]);
      } else if (currentStep === 1) {
        await form.validateFields(["username", "email", "phone", "dob"]);
      }
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      // Validation error, do nothing
    }
  };

  const prev = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = (values) => {
    const allValues = form.getFieldsValue(true);
    if (onFinish) onFinish(allValues);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFinish}
      className="space-y-4 relative min-h-[320px]"
      style={{ overflow: "hidden" }}
    >
      <AnimatePresence custom={direction} mode="wait">
        {currentStep === 0 && (
          <motion.div
            key={0}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            <h2 className="text-lg font-semibold mb-2">Personal Info</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[{ required: true, message: "Enter your first name" }]}
                >
                  <Input placeholder="John" className="p-2 rounded-md" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[{ required: true, message: "Enter your last name" }]}
                >
                  <Input placeholder="Doe" className="p-2 rounded-md" />
                </Form.Item>
              </Col>
            </Row>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div
            key={1}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            <h2 className="text-lg font-semibold mb-2">Account Info</h2>
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Enter your username" }]}
            >
              <Input placeholder="johndoe123" className="p-2 rounded-md" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Enter your email" },
                { type: "email", message: "Invalid email address" },
              ]}
            >
              <Input
                placeholder="john@example.com"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Enter your phone number" },
                {
                  pattern: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              ]}
            >
              <Input placeholder="e.g. 0912345678" className="p-2 rounded-md" />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true, message: "Select your date of birth" }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                placeholder="Select DOB"
              />
            </Form.Item>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key={2}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={direction}
          >
            <h2 className="text-lg font-semibold mb-2">Set Password</h2>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter your password" }]}
            >
              <Input.Password
                placeholder="••••••••"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Re-enter password"
                className="p-2 rounded-md"
              />
            </Form.Item>
          </motion.div>
        )}
      </AnimatePresence>

      <Form.Item>
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prev}
              className="bg-gray-300 text-black py-2 px-4 rounded-md font-semibold hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {currentStep < 2 && (
            <button
              type="button"
              onClick={next}
              className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-800"
            >
              Next
            </button>
          )}
          {currentStep === 2 && (
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-800"
            >
              Sign Up
            </button>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
