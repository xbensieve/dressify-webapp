import React from "react";
import { Button, Select } from "antd";
import "../../styles/CustomSelect.css";
import {
  LeftCircleFilled,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const HorizontalFilterBar = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-gray-100 p-2 sm:p-3 md:p-4 lg:p-5 rounded-none flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-3 md:mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 flex-wrap">
        <span className="font-inter text-xs sm:text-sm md:text-base text-gray-700">
          Sort by
        </span>
        <Button
          onClick={() => handleFilterChange("sort", "latest")}
          className="min-w-[70px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[120px] rounded-none text-xs sm:text-sm md:text-base"
        >
          Latest
        </Button>
        <Select
          value={
            filters.sort === "lowToHigh" || filters.sort === "highToLow"
              ? filters.sort
              : undefined
          }
          onChange={(value) => handleFilterChange("sort", value)}
          className="min-w-[70px] sm:min-w-[90px] md:min-w-[100px] lg:min-w-[120px] custom-ant-select"
          placeholder="Price"
          size="middle"
        >
          <Option value="lowToHigh">Low to High</Option>
          <Option value="highToLow">High to Low</Option>
        </Select>
      </div>
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 mt-2 sm:mt-0 sm:ml-auto">
        <LeftCircleOutlined />
        <span className="font-inter text-xs sm:text-sm md:text-base text-gray-700">
          1 / 5
        </span>
        <RightCircleOutlined />
      </div>
    </div>
  );
};

export default HorizontalFilterBar;
