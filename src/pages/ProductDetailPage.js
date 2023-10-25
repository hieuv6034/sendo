import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/common/ProductDetail';

// Import dữ liệu sản phẩm
import { data } from '../data/productData';

function ProductDetailPage() {
  // Sử dụng useParams để lấy tham số đường dẫn 'id'
  const { id } = useParams();

  // Tìm sản phẩm dựa trên 'id' trong dữ liệu
  const product = data.allProduct.find((product) => product.id === parseInt(id, 10));

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}

export default ProductDetailPage;
