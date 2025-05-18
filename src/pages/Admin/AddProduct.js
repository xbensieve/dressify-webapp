import React, { useState } from "react";
import axios from "axios";

const AddProductTest = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [variations, setVariations] = useState([
    { size: "", color: "", price: "", stock_quantity: "" },
  ]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariationChange = (idx, e) => {
    const updated = [...variations];
    updated[idx][e.target.name] = e.target.value;
    setVariations(updated);
  };

  const addVariation = () => {
    setVariations([
      ...variations,
      { size: "", color: "", price: "", stock_quantity: "" },
    ]);
  };

  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("variations", JSON.stringify(variations));
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products", // Change to your API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mjk1MTQ4MmJiYTUwYWE5ODg1ZmMzZSIsInVzZXJuYW1lIjoiT0FkbWluMjgwMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NzU1NTUyOSwiZXhwIjoxNzQ3NTU2NDI5fQ.VZ3gRDpMlz-cAs_iAJWXR37k55_hD8n2uA6h7tFxaHM'
          },
        }
      );
      setMessage("Product added! " + JSON.stringify(res.data));
    } catch (err) {
      setMessage("Error: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        name="name"
        placeholder="Name"
        value={product.name}
        onChange={handleProductChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleProductChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={handleProductChange}
        required
      />
      <input
        name="category_id"
        placeholder="Category ID"
        value={product.category_id}
        onChange={handleProductChange}
        required
      />

      <h3>Variations</h3>
      {variations.map((v, idx) => (
        <div key={idx}>
          <input
            name="size"
            placeholder="Size"
            value={v.size}
            onChange={(e) => handleVariationChange(idx, e)}
          />
          <input
            name="color"
            placeholder="Color"
            value={v.color}
            onChange={(e) => handleVariationChange(idx, e)}
          />
          <input
            name="price"
            type="number"
            placeholder="Variation Price"
            value={v.price}
            onChange={(e) => handleVariationChange(idx, e)}
          />
          <input
            name="stock_quantity"
            type="number"
            placeholder="Stock"
            value={v.stock_quantity}
            onChange={(e) => handleVariationChange(idx, e)}
          />
        </div>
      ))}
      <button type="button" onClick={addVariation}>
        Add Variation
      </button>

      <h3>Images</h3>
      <input type="file" multiple onChange={handleImagesChange} />

      <button type="submit">Submit</button>
      <div>{message}</div>
    </form>
  );
};

export default AddProductTest;
