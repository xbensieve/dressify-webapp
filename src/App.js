import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
const HomePage = lazy(() => import("./pages/Common/HomePage"));
const MainLayout = lazy(() => import("./components/layout/MainLayout"));
const ContactUsPage = lazy(() => import("./pages/Common/ContactUsPage"));
const AboutUsPage = lazy(() => import("./pages/Common/AboutUsPage"));
const NotFoundPage = lazy(() => import("./pages/Common/NotFoundPage"));
const Login = lazy(() => import("./pages/Common/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const ManageCategory = lazy(() => import("./pages/Admin/ManageCategory"));
const ManageProduct = lazy(() => import("./pages/Admin/ManageProduct"));
const ManageUser = lazy(() => import("./pages/Admin/ManageUser"));
const RequireRole = lazy(() => import("./components/RequireRole"));
const SearchPage = lazy(() => import("./pages/Product/SearchPage"));
const TermsAndPolicyPage = lazy(() =>
  import("./pages/Common/TermsAndPolicyPage")
);
const ProductDetailPage = lazy(() =>
  import("./pages/Product/ProductDetailPage")
);
const PaymentSuccessPage = lazy(() =>
  import("./pages/Payment/PaymentSuccessPage")
);
const PaymentFailedPage = lazy(() =>
  import("./pages/Payment/PaymentFailedPage")
);
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Loading = lazy(() => import("./components/Loading"));
const ProfilePage = lazy(() => import("./pages/Common/Profile"));
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route
                path="/terms-and-policy"
                element={<TermsAndPolicyPage />}
              />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/search/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/profile"
                element={
                  <RequireRole allowedRoles="customer">
                    <ProfilePage />
                  </RequireRole>
                }
              ></Route>
            </Route>
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/failed" element={<PaymentFailedPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <RequireRole allowedRoles="admin">
                  <Dashboard />
                </RequireRole>
              }
            >
              <Route path="category" element={<ManageCategory />} />
              <Route path="product" element={<ManageProduct />} />
              <Route path="user" element={<ManageUser />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
