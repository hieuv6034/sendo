// CartPage.js
import React from 'react';
import ShoppingCart from '../components/common/ShoppingCart';

function CartPage({ showHeader }) {
  // Nếu showHeader là false, ẩn header
  if (!showHeader) {
    return (
      <div>
        {/* Nội dung trang Giỏ hàng */}
        <ShoppingCart />
      </div>
    );
  }

  // Ngược lại, hiển thị header
  return (
    <div>
      {/* Header */}
      <header>
        {/* Nội dung của header */}
      </header>

      {/* Nội dung trang Giỏ hàng */}
    </div>
  );
}

export default CartPage;
