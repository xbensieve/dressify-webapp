import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import MainLayout from "./components/MainLayout";
import ContactUsPage from "./pages/ContactUsPage";
import AboutUsPage from "./pages/AboutUsPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/detail" element={<ProductDetailPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
