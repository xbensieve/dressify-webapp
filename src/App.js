import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MainLayout from "./components/MainLayout";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import SideBarFilter from "./components/SideBarFilter";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailedPage from "./pages/PaymentFailedPage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ManageCategory from "./pages/Admin/ManageCategory";
import ManageProduct from "./pages/Admin/ManageProduct";
import ManageUser from "./pages/Admin/ManageUser";
import RequireRole from "./components/RequireRole";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<SideBarFilter />}>
              <Route path="/product" element={<ProductPage />} />
            </Route>
            <Route path="/detail" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/failed" element={<PaymentFailedPage />} />
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
