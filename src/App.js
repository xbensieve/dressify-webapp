import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import MainLayout from "./components/MainLayout";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<MainLayout />}>
            <Route path="/product" element={<ProductPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
