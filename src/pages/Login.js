import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { Divider, Form, Input, Alert } from "antd";
import Footer from "../components/Footer";
import { loginApi, loginWithGoogle } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoginImage from "../components/LoginImage";
import LoginHeader from "../components/LoginHeader";
import { AuthContext } from "../context/AuthContext";
import userApi from "../api/userApi";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await loginApi.login(values);
      console.log(response);
      if (response.data.success === false) {
        setError(response.data.message);
      }
      const userInfo = await userApi.getUser();
      setUser(userInfo);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async (credentialResponse) => {
    setIsLoading(true);
    try {
      await loginWithGoogle(credentialResponse.credential);
      const userInfo = await userApi.getUser();
      setUser(userInfo);
      navigate("/");
    } catch (error) {
      setError("Login with Google failed. Please try again.", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setError(null);
  };

  return (
    <div className="relative">
      {isLoading && <Loading />}
      <header class="bg-slate-950 text-white py-6 px-8">
        <div class="flex items-center">
          <h1 class="text-4xl font-inter tracking-wide">Xbensieve Sign In</h1>
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        class="flex h-screen"
      >
        <LoginImage />
        <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div class="max-w-md w-full p-6">
            <LoginHeader />
            <div class="mt-4 flex flex-col items-center justify-between">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleLoginWithGoogle(credentialResponse);
                }}
                onError={() => {
                  setError("Login failed. Please try again.");
                }}
              />
            </div>
            <Divider
              plain
              style={{ marginTop: 24, marginBottom: 24, color: "#555" }}
            >
              or with username
            </Divider>
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                closable
                onClose={onClose}
              />
            )}
            <div className="w-full max-w-md mx-auto">
              <Form layout="vertical" onFinish={onFinish} className="space-y-4">
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    placeholder="Enter your username"
                    className="p-2 rounded-md"
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
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
                      Sign Up
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <a href="/login" class="text-black hover:underline">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};
export default Login;
