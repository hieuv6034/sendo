import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from '../../assets/css/footer.module.scss';

const cx = classNames.bind(styles);


class Footer extends Component {
  render() {
    return (
      <div className={cx('footer')}>
        <div className={cx('footer-ads')}>
          <div className={cx('content section')}>
            <a href="/" className={cx('footer-ads-item')}  >
              <img alt="#" src="https://media3.scdn.vn/img4/2020/12_16/gJwXr6FFZKZCGKWaz4RB.png" />
              <div className={cx('title-footer-ads')}>Siêu nhiều hàng tốt</div>
              <div className={cx('detail-footer-ads')}>Cần gì cũng có 26 ngành hàng & 10 triệu sản phẩm</div>
            </a>
            <a href="/" className={cx('footer-ads-item')}>
              <img alt="#" src="https://media3.scdn.vn/img4/2020/12_16/EfZWQVfV6nQzu2vMmnwC.png" />
              <div className={cx('title-footer-ads')} >Siêu yên tâm</div>
              <div className={cx('detail-footer-ads')}>Miễn phí đổi trả 48h</div>
            </a>
            <a href="/" className={cx('footer-ads-item')}>
              <img alt="#" src="https://media3.scdn.vn/img4/2020/12_16/j5C6IQz7gIXPgjFJxmRz.png" />
              <div className={cx('title-footer-ads')}>Siêu tiện lợi</div>
              <div className={cx('detail-footer-ads')}>Mang thế giới mua sắm của Sendo trong tầm tay bạn</div>
            </a>
            <a href="/" className={cx('footer-ads-item')}>
              <img alt="#" src="https://media3.scdn.vn/img4/2020/12_16/7AJFQGQ5qvS7gGOz8P7a.png" />
              <div className={cx('title-footer-ads')}>Siêu tiết kiệm</div>
              <div className={cx('detail-footer-ads')}>Giá hợp lý, vừa túi tiền. Luôn có nhiều chương trình khuyến mãi</div>
            </a>
          </div>
        </div>
        <div className={cx('footer-contact')}>
          <div className={cx('content section footer-item-contact')}>
            <div className={cx('left-contact')}> 
              <div className= {cx('name-company')}>Công ty Cổ phần Công nghệ Sen Đỏ, thành viên của Tập đoàn FPT</div>
              <div className={cx('detail-company')}>
                Số ĐKKD: 0312776486 - Ngày cấp: 13/05/2014, được sửa đổi lần thứ 20, ngày 26/04/2022.
              </div>
              <div className={cx('detail-company')}>Cơ quan cấp: Sở Kế hoạch và Đầu tư TPHCM.</div>
              <div className={cx('detail-company')}>
                Địa chỉ: Tầng 5, Tòa nhà A, Vườn Ươm Doanh Nghiệp, Lô D.01, Đường Tân Thuận, Khu chế xuất Tân Thuận,
                Phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam.
              </div>
              <div className={cx('detail-company')}>Email: lienhe@sendo.vn</div>
              <div className={cx('detail-company')}>
                <div className={cx('policy')}>
                  <img alt="#" src="https://media3.scdn.vn/img4/2020/12_16/XhpGDnvWqrlKeHLst3aS.png" />
                  <img alt="#" src="https://media3.scdn.vn/img4/2020/12_16/h6lEMGIAt4Uapd0Mls34.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
