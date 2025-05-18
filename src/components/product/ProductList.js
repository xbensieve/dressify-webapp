import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const ProductList = ({ products, onEdit, onDelete, loading }) => {
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => onDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={products}
      loading={loading}
      pagination={{ pageSize: 8 }}
      scroll={{ x: true }}
    />
  );
};

export default ProductList;
