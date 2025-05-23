import React from "react";
import { Select, Slider, Typography } from "antd";

const { Text } = Typography;
const { Option } = Select;

const FilterSidebar = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <Text strong className="!text-lg mb-4 block">
        Filters
      </Text>

      <div className="mb-6">
        <Text strong>Sort By</Text>
        <Select
          className="w-full mt-2"
          placeholder="Sort by"
          value={filters.sort}
          onChange={(value) => handleChange("sort", value)}
        >
          <Option value="latest">Latest</Option>
          <Option value="priceDesc">Price: High to Low</Option>
          <Option value="priceAsc">Price: Low to High</Option>
        </Select>
      </div>

      <div className="mb-6">
        <Text strong>Category</Text>
        <Select
          className="w-full mt-2"
          placeholder="Select category"
          value={filters.category}
          onChange={(value) => handleChange("category", value)}
          allowClear
        >
          <Option value="electronics">Electronics</Option>
          <Option value="clothing">Clothing</Option>
          <Option value="books">Books</Option>
          <Option value="home">Home & Kitchen</Option>
        </Select>
      </div>

      <div className="mb-6">
        <Text strong>Price Range</Text>
        <Slider
          range
          min={0}
          max={1000}
          value={filters.priceRange}
          onChange={(value) => handleChange("priceRange", value)}
          className="mt-2"
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <Text strong>Size</Text>
        <Select
          className="w-full mt-2"
          placeholder="Select size"
          value={filters.size}
          onChange={(value) => handleChange("size", value)}
          allowClear
        >
          <Option value="small">Small</Option>
          <Option value="medium">Medium</Option>
          <Option value="large">Large</Option>
          <Option value="xl">XL</Option>
        </Select>
      </div>

      <div className="mb-6">
        <Text strong>Color</Text>
        <Select
          className="w-full mt-2"
          placeholder="Select color"
          value={filters.color}
          onChange={(value) => handleChange("color", value)}
          allowClear
        >
          <Option value="red">Red</Option>
          <Option value="blue">Blue</Option>
          <Option value="black">Black</Option>
          <Option value="white">White</Option>
        </Select>
      </div>
    </div>
  );
};

export default FilterSidebar;
