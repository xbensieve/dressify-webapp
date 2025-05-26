import React, { useEffect } from "react";
import { Button, Rate, Select, Typography } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import categoryApi from "../../api/categoryApi";
import Input from "antd/es/input/Input";
const { Text } = Typography;
const { Option } = Select;

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = React.useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div>
      <Text strong className="!text-lg mb-4 block text-left">
        <div className="flex items-center">
          <FilterOutlined style={{ marginRight: 8 }} />
          <span>Search Filters</span>
        </div>
      </Text>
      <div className="mb-6">
        <Text strong className="text-left block">
          By Category
        </Text>
        <Select
          className="w-full mt-2 text-left"
          placeholder="Select category"
          value={filters.category}
          onChange={(value) => handleChange("category", value)}
          allowClear
        >
          {categories.map((category) => (
            <Option key={category._id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mb-6">
        <Text strong className="text-left block mb-2">
          Price Range
        </Text>
        <div className="flex items-center gap-2">
          <Input
            placeholder="$ MIN"
            type="number"
            min={0}
            max={1000000000}
            step={10}
            value={filters.minPrice}
            className="w-full"
          />
          <span className="text-gray-400">–</span>
          <Input
            placeholder="$ MAX"
            type="number"
            min={0}
            max={1000000000}
            step={10}
            value={filters.maxPrice}
            className="w-full"
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Min must be less than Max. Only numbers allowed.
        </div>
        <Button
          block
          className="mt-4 font-semibold rounded-none"
          onClick={() => onFilterChange(filters)}
        >
          APPLY
        </Button>
      </div>
      <div className="mb-6">
        <Text strong className="block text-left">
          Rating
        </Text>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            className="flex items-center mt-1 cursor-pointer hover:text-yellow-500"
            onClick={() => handleChange(rating)}
          >
            <Rate disabled value={rating} className="text-sm" />
            {rating !== 5 && (
              <span className="ml-2 text-sm text-gray-600">& Up</span>
            )}
          </div>
        ))}
      </div>
      <Button block className="mt-4 font-semibold uppercase rounded-none">
        Clear All
      </Button>
    </div>
  );
};

export default FilterSidebar;
