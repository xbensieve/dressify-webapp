import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Common/HomePage";
import MainLayout from "./components/layout/MainLayout";
import ContactUsPage from "./pages/Common/ContactUsPage";
import AboutUsPage from "./pages/Common/AboutUsPage";
import NotFoundPage from "./pages/Common/NotFoundPage";
import Login from "./pages/Common/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ManageCategory from "./pages/Admin/ManageCategory";
import ManageProduct from "./pages/Admin/ManageProduct";
import ManageUser from "./pages/Admin/ManageUser";
import RequireRole from "./components/RequireRole";
import SearchPage from "./pages/Product/SearchPage";
import TermsAndPolicyPage from "./pages/Common/TermsAndPolicyPage";
import ProductDetailPage from "./pages/Product/ProductDetailPage";
import Cart from "./pages/Cart/Cart";
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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
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
      </Router>
    </div>
  );
}

export default App;
