import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import classNames from 'classnames/bind';
import styles from '../../assets/css/shoppingcart.module.scss';
import { Card, Space, Checkbox } from 'antd';
import { MessageOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShoppingCart() {
  const { cartItems: contextCartItems, cartCount: contextCartCount } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(
      contextCartItems.map((item) => ({
        ...item,
        isChecked: true, // Initialize all items as checked initially
      }))
    );
  }, [contextCartItems]);

  const onChange = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });

    setCartItems(updatedCart);
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      if (item.isChecked) {
        total += item.sale_price_max * item.quantity;
      }
    });
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const handleDeleteProduct = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };
  

  return (
    <div className={cx('shopping-cart')}>
      <div className={cx('content')}>
        <h1>Giỏ hàng của bạn ({contextCartCount})</h1>

        <div className={cx('cart')}>
          <div className={cx('products-cart')}>
            <Space direction="vertical" size={16}>
              {cartItems.map((item) => (
                <div key={item.id} className={cx('product-cart')}>
                  <Card
                    title={item.shop.name}
                    extra={
                      <div className={cx('product-cart-chat')}>
                        <button className={cx('product-cart-btn')}>
                          <MessageOutlined />
                          <span className="">Chat với Shop</span>
                        </button>
                      </div>
                    }
                  >
                    <div className="" pt="2">
                      <div className="">
                        <div className="">
                          <div className={cx('cart-product-1')} px="4">
                            <div className={cx('cart-product-2')}>
                              <div className="" mr="4">
                                <div className={cx('product-item-main')}>
                                  <div className={cx('product-image-item')}>
                                    <label className={cx('product-check-box')}>
                                      <>
                                        <p
                                          style={{
                                            marginBottom: '20px',
                                          }}
                                        >
                                          <Checkbox checked={item.isChecked} onChange={() => onChange(item.id)} />
                                        </p>
                                      </>
                                    </label>
                                    <div className="">
                                      <a href="https://sendo.vn/noi-dien-nau-chao-nau-bot-kho-ca-chung-yen-baby-carey-30895501.html">
                                        <div className="" style={{ width: '80px', height: 'fit-content' }}>
                                          <div className={cx('cart-img-product')}>
                                            <img src={item.image} alt={item.name} className="" />
                                          </div>
                                        </div>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className={cx('product-item-sub')}>
                                <div className="">
                                  <div className="">
                                    <span className={cx('product-item-sub-comment')}>
                                      <span className="">Mua trước trả sau</span>
                                    </span>
                                  </div>
                                </div>
                                <div className={cx('product-item-sub-cart')}>
                                  <Link title={item.name} to={`/products/${item.id}`}>
                                    {item.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                            <div className={cx('product-price-sale')}>
                              <span className="">{item.sale_price_max}đ</span>
                            </div>
                            <div className="">
                              <div className={cx('btn-product-num')}>
                                <button className={cx('btn-buy-number-sp')} onClick={() => handleDecreaseQuantity(item.id)}>
                                  {' '}
                                  <MinusOutlined />{' '}
                                </button>
                                <input
                                  inputMode="numeric"
                                  value={item.quantity}
                                 
                                />
                                <button className={cx('btn-buy-number-sp')} onClick={() => handleIncreaseQuantity(item.id)}>
                                  <PlusOutlined />
                                </button>
                              </div>
                            </div>
                            <div className={cx('button-cart-main')}>
                              <div>
                                <button className={cx('button-cart-icon','cart-love')}>
                                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" className="d7ed-SwZDZ2 d7ed-w34diS">
                                    <path
                                      d="M16.553 2C20.258 2.015 23 5.14 23 9.12c0 3.038-1.694 5.972-4.849 8.81-1.656 1.49-3.77 2.963-5.285 3.747l-.866.45-.866-.45c-1.515-.784-3.63-2.258-5.285-3.747C2.694 15.092 1 12.158 1 9.12 1 5.097 3.716 2 7.455 2c1.395 0 2.376.189 3.467.728a6.3 6.3 0 0 1 1.068.668 6.17 6.17 0 0 1 1.113-.7c1.07-.524 2.003-.696 3.45-.696Zm-.004 2c-1.162 0-1.803.118-2.567.492-.47.23-.887.541-1.25.936l-.73.79-.735-.784a4.266 4.266 0 0 0-1.232-.913C9.248 4.13 8.565 4 7.455 4 4.884 4 3 6.148 3 9.12c0 2.38 1.414 4.83 4.186 7.323 1.512 1.36 3.455 2.718 4.814 3.43 1.359-.712 3.302-2.07 4.814-3.43C19.586 13.949 21 11.5 21 9.12c0-2.931-1.912-5.11-4.45-5.12Z"
                                      fill="#6F787E"
                                      fillRule="nonzero"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                              <div>
                                <button className={cx('button-cart-icon' ,'cart-delete')}
                                   onClick={() => handleDeleteProduct(item.id)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" className="d7ed-SwZDZ2 d7ed-w34diS">
                                    <path
                                      d="M14 1c.537 0 1.042.214 1.414.586.308.307.509.708.575 1.211L16 3v1h2.5a2.49 2.49 0 0 1 1.623.599l.145.133c.404.405.66.937.723 1.564L21 6.5V9h-1.111l-.62 11.166a2.997 2.997 0 0 1-.789 1.866l-.145.147c-.49.463-1.12.75-1.844.812l-.218.009H7.727a2.994 2.994 0 0 1-2.975-2.616l-.02-.218L4.11 9H3V6.5c0-.671.267-1.303.732-1.768.405-.404.937-.66 1.564-.723L5.5 4H8V3c0-.477.169-.930.468-1.285l.118-.13c.307-.307.708-.508 1.211-.574L10 1zm3.885 8H6.114l.611 11.012.012.132c.032.224.14.428.303.582a.99.99 0 0 0 .687.274h8.503l.132-.004a.994 a.994 0 0 0 .598-.27.996.996 0 0 0 .312-.67L17.885 9zM9 11a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm3 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zM8 5.998H5.55l-.102.005A.495.495 0 0 0 5 6.5V7h14.001v-.45l-.004-.102A.495.495 0 0 0 18.5 6H8v-.002zm2.067-3L10 3v1h4.001l.001-.933L14 3l-3.932-.002z"
                                      fill="#6F787E"
                                      fillRule="nonzero"
                                    ></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div py="5" px="4" className={cx('sale-of-shop-main')}>
                      <div className={cx('sale-of-shop')}>
                        <div className={cx('sale-of-shop-icon')}>
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g fill="none" fillRule="nonzero">
                              <path fill="#CFD2D4" d="M14 6h7v12h-7" />
                              <path
                                d="M21 4a2 2 0 0 1 2 2v3.112l-.5.289A2.998 a.996 0 0 0 20.706 11L21 10.589V18a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.112l.5-.289A2.998 2.998 0 0 0 3 12a2.998 2.998 0 0 0-1.5-2.6L1 9.113V6a2 2 0 0 1 2-2h18Zm0 2-6-.001a1 1 0 0 1-.883.994L14 7a1 1 0 0 1-1-1.001L3 6v2c1.241.93 2 2.4 2 4s-.759 3.07-2 4v2l10-.001a1 1 0 0 1 1.993-.116L15 18 21 18v-2c-1.241-.93-2-2.4-2-4s.759-3.07 2-4V6Zm-7 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
                                fill="#6F787E"
                              />
                            </g>
                          </svg>
                        </div>
                        <div className={cx('sale-of-shop-cmt')}>
                          <div>
                            <span>Mã giảm giá của Shop</span>
                          </div>
                          <div>
                            <svg width="24" height="24" viewBox="0 0 24 24">
                              <path
                                fill="#6F787E"
                                fillRule="nonzero"
                                d="M13.214 12 8 6.476 9.393 5 16 12l-6.607 7L8 17.524z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </Space>
          </div>

          <div className={cx('sales-cart')}>
            <Space direction="vertical" size={16}>
              <Card title="Mã ưu đãi Sendo " extra={<a href="/">Chọn/nhập mã</a>}>
                <div className={cx('total-price-product-of-cart')}>
                  <p>Tạm tính: </p>
                  <span>{`${totalPrice} đ`}</span>
                </div>

                <div className={cx('buy')}>
                  <div className={cx('buy-now')}>
                    <button>Mua ngay</button>
                  </div>
                </div>
              </Card>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
