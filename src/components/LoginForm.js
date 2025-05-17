import { Form, Input } from "antd";
const LoginForm = ({ onFinish }) => {
  return (
    <Form layout="vertical" onFinish={onFinish} className="space-y-4">
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Enter your username" className="p-2 rounded-md" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          placeholder="Enter your password"
          className="p-2 rounded-md"
        />
      </Form.Item>
      <Form.Item>
        <div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold
                 hover:bg-gray-800 active:scale-95
                 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
