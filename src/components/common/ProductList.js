import React, { Component } from 'react';
import { data } from '../../data/productData'; // Đảm bảo rằng đường dẫn đúng
import styles from '../../assets/css/header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ProductList extends Component {
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  checkPercent(x) {
    if (x) {
      return `-${x}%`;
    } else {
      return '';
    }
  }

  checkPrice(x) {
    if (x) {
      return `${this.numberWithCommas(x)}đ`;
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className={cx('ads-product')} id="ads-product">
        <span>Sản phẩm được tài trợ</span>
        <div>
          {data.adsProduct.map((item, index) => (
            <a href="/" className={cx('product-item')} key={index}>
              <img alt="" src={item.image} />
              <div className={cx('info-product')}>
                <div className={cx('branch')}>
                  <img
                    alt=""
                    src="https://media3.scdn.vn/img4/2021/10_21/mFcIndYzGOkBpNH6w5oN.png"
                  />
                </div>
                <div className={cx('name')}>
                  <img
                    alt=""
                    src="https://media3.scdn.vn/img4/2020/07_30/h6fJaiL5WkEbDU2eQRZb.png"
                  />
                  <span>{item.name}</span>
                </div>
                <div className={cx('sale')}>
                  <span>
                    {`${this.numberWithCommas(item.default_price_min)}đ`}
                  </span>
                  <div>{this.checkPercent(item.sale_percent)}</div>
                </div>
                <div className={cx('price')}>
                  {`${this.numberWithCommas(item.sale_price_max)}đ`}
                </div>
                <div className={cx('sold')}>Đã bán {item.sold}</div>
                <div className={cx('quality')}>
                  <div>
                    <span>{item.rated.star}/5</span>
                    <svg
                      width="12"
                      height="12"
                      aria-hidden="true"
                      fill="#ffc600"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>First star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <div className={cx('address')}>
                    {item.shop.ware_house_region_name}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
