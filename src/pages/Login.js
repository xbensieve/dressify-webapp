import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { Divider, Alert, message } from "antd";
import Footer from "../components/Footer";
import { loginApi, loginWithGoogle } from "../api/loginApi";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import LoginImage from "../components/LoginImage";
import LoginHeader from "../components/LoginHeader";
import { AuthContext } from "../context/AuthContext";
import userApi from "../api/userApi";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await loginApi.login(values);
      const userInfo = await userApi.getUser();
      setUser(userInfo);
      message.success("Login successful!");
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
      setError(null);
      navigate("/");
    } catch (error) {
      setError("Login with Google failed. Please try again.", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      const response = await loginApi.register(values);
      setUser(null);
      setError(null);
      setIsSignUp(false);
      message.success(response.data.message); // Show success message
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setError(null);
  };

  const shiftForm = () => {
    setIsSignUp(!isSignUp);
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
              {isSignUp ? (
                <RegistrationForm onFinish={handleRegister} />
              ) : (
                <LoginForm onFinish={onFinish} />
              )}
            </div>

            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button onClick={shiftForm} class="text-black hover:underline">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
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
