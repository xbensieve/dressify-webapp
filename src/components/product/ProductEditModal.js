import React from "react";
import { Modal } from "antd";
import ProductForm from "./ProductForm";

const ProductEditModal = ({
  visible,
  onCancel,
  onFinish,
  initialValues,
  loading,
  categories,
}) => (
  <Modal
    open={visible}
    title="Edit Product"
    onCancel={onCancel}
    footer={null}
    destroyOnClose
  >
    <ProductForm
      initialValues={initialValues}
      onFinish={onFinish}
      loading={loading}
      categories={categories}
    />
  </Modal>
);

export default ProductEditModal;