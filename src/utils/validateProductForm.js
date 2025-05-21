const validateProductForm = (
  product,
  images,
  variations,
  selectedCategory,
  message
) => {
  const errors = [];

  // Product details validation
  if (!product.name || !product.description || !product.price) {
    errors.push(
      "Please fill in all required fields (Name, Description, Price)"
    );
  }
  if (product.name?.length < 2 || product.name?.length > 100) {
    errors.push("Product name must be between 2 and 50 characters");
  }
  if (product.description?.length < 50) {
    errors.push("Product description must be at least 50 characters");
  }
  if (product.price < 0) {
    errors.push("Product price cannot be negative");
  }

  // Images validation
  if (images.length === 0) {
    errors.push("Please upload at least one product image");
  }

  // Category validation
  if (!selectedCategory) {
    errors.push("Please select a category");
  }

  // Variations validation
  variations.forEach((v, index) => {
    if (!v.size || !v.color || !v.price) {
      errors.push(
        `Variation ${index + 1}: All fields (Size, Color, Price) are required`
      );
    }
    if (v.color?.length < 2 || v.color?.length > 20) {
      errors.push(
        `Variation ${index + 1}: Color must be between 2 and 20 characters`
      );
    }
    if (v.price < 0) {
      errors.push(`Variation ${index + 1}: Price cannot be negative`);
    }
    if (v.stock_quantity < 0) {
      errors.push(`Variation ${index + 1}: Stock quantity cannot be negative`);
    }
  });

  if (errors.length > 0) {
    message.error(errors.join("; "));
    return false;
  }

  return true;
};

export default validateProductForm;
