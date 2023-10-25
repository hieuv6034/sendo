import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './assets/css/app.module.scss';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { CartProvider } from './context/CartContext'; 

const cx = classNames.bind(styles);

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <div className={cx('body')}>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
