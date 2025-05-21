import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./components/layout/MainLayout";
import ContactUsPage from "./pages/Common/ContactUsPage";
import AboutUsPage from "./pages/Common/AboutUsPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailedPage from "./pages/PaymentFailedPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ManageCategory from "./pages/Admin/ManageCategory";
import ManageProduct from "./pages/Admin/ManageProduct";
import ManageUser from "./pages/Admin/ManageUser";
import RequireRole from "./components/RequireRole";
import SearchPage from "./pages/Product/SearchPage";
import TermsAndPolicyPage from "./pages/Common/TermsAndPolicyPage";
import ProductDetailPage from "./pages/Product/ProductDetailPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/terms-and-policy" element={<TermsAndPolicyPage />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/failed" element={<PaymentFailedPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/:id" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

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
      </Router>
    </div>
  );
}

export default App;
