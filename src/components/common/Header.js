import React, { useState  , useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../../assets/css/header.module.scss';
import logo from '../../assets/image/logo.svg';
import menu from '../../assets/image/menu.svg';
import cart from '../../assets/image/cart.svg';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const cx = classNames.bind(styles);

const Header = () => {
  const [state, setState] = useState({
    input: '',
    qr: false,
    contactHeader: false,
    checkDonHang: false,
    proposal: false,
  });
  const { cartCount } = useCart();

  const changeState = (value) => {
    setState((prevState) => ({
      ...prevState,
      input: value,
      data: [],
    }));
  };

  const [isScrolled, setIsScrolled] = useState(false);


  const checkInput = (event) => {
    event.preventDefault();
    const data = event.target.value;
    console.log(data);
    changeState(data);
    //document.getElementById('ads-product').style.display = 'none'; Uncomment if needed
  };

  const toggleQR = () => {
    setState((prevState) => ({
      ...prevState,
      qr: !prevState.qr,
      contactHeader: false,
      checkDonHang: false,
    }));
    document.getElementById('qr').style.display = state.qr ? 'none' : 'flex';
    document.getElementById('checkDonHang').style.display = 'none';
    document.getElementById('header-contact').style.display = 'none';
  };

  const toggleContactHeader = () => {
    setState((prevState) => ({
      ...prevState,
      contactHeader: !prevState.contactHeader,
      qr: false,
      checkDonHang: false,
    }));
    document.getElementById('header-contact').style.display = state.contactHeader ? 'none' : 'block';
    document.getElementById('checkDonHang').style.display = 'none';
    document.getElementById('qr').style.display = 'none';
  };

  const toggleProposal = () => {
    setState((prevState) => ({
      ...prevState,
      proposal: !prevState.proposal,
    }));
    document.getElementById('proposal').style.display = state.proposal ? 'none' : 'block';
  };

  const proposalHandler = (value) => {
    document.getElementById('input').value = value;
    setState((prevState) => ({
      ...prevState,
      proposal: false,
    }));
    document.getElementById('proposal').style.display = 'none';
  };

  const toggleCheckDonHang = () => {
    setState((prevState) => ({
      ...prevState,
      checkDonHang: !prevState.checkDonHang,
      contactHeader: false,
      qr: false,
    }));
    document.getElementById('checkDonHang').style.display = state.checkDonHang ? 'none' : 'grid';
    document.getElementById('header-contact').style.display = 'none';
    document.getElementById('qr').style.display = 'none';
  };


  
  
  const toggleElement = (element) => {
    setState((prevState) => ({
      ...prevState,
      [element]: !prevState[element],
    }));
  };
  
  const handleScroll = () => {
    const scrollTop = window.scrollY > window.innerHeight;
    setIsScrolled(scrollTop);
    
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    const conscroll = window.scrollY;
    console.log(handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={cx('header', isScrolled ? 'scroll' : '')} >
        <div className={cx('top-header')}>
          <div className={cx('content', 'top-header-item', 'section', 'not-black-out')}>
            <div id="down-app" onClick={toggleQR}>
              Tải ứng dụng
              <div className={cx('block', 'qr')} id="qr">
                <img alt="" src="https://media3.scdn.vn/img2/2018/5_23/R842FO.png" />
                <span>Quét để tải ứng dụng</span>
              </div>
            </div>
            <div id="customerCare" className={cx('customerCare')} onClick={toggleContactHeader}>
              Chăm sóc khách hàng
              <div className={cx('block')} id="header-contact">
                <div>Trung tâm hỗ trợ</div>
                <div>Trả hàng hoàn tiền</div>
              </div>
            </div>
            <div className={cx('checkDonHang')} onClick={toggleCheckDonHang}>
              Kiểm tra đơn hàng
              <div id="checkDonHang" className={cx('block')}>
                <form>
                  <input placeholder="Nhập mã đơn hàng" className={cx('block')} />
                  <input placeholder="Email / Số điện thoại" className={cx('block')} />
                  <button className={cx('block')}>Kiểm tra</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={cx('bottom-header')}>
          <div className={cx('bottom-header-item', 'content', 'section')}>
            <Link to="/">
              <div className={cx('logo')}>
                <img alt="" src={logo} />
              </div>
            </Link>
            <div className={cx('form-search', 'section')}>
              <div className={cx('menu')}>
                <img alt="" src={menu} />
              </div>
              <form className={cx('search-form')} id="myForm">
                <div>
                  <input
                    className={cx('input-search', 'block')}
                    id="input"
                    onClick={toggleProposal}
                    autoComplete="off"
                    type="search"
                  />
                  <div id="proposal" className={cx('block', 'proposal')}>
                    <div className={cx('proposal-item')} onClick={() => proposalHandler('giày nam thể thao')}>
                      giày nam thể thao
                    </div>
                    <div className={cx('proposal-item')} onClick={() => proposalHandler('giày nam sneaker')}>
                      giày nam sneaker
                    </div>
                    {/* ... (other proposal items) ... */}
                  </div>
                </div>
                <button className={cx('btn-search', 'block')} onClick={checkInput}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xlink="http://www.w3.org/1999/xlink"
                    className={cx('svg-search')}
                  >
                    <path
                      d="M10 2a8 8 0 0 1 6.32 12.905l5.387 5.388-1.414 1.414-5.388-5.386A8 8 0 1 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
                      fill="#445058"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
            <div className={cx('sign-in', 'section')}>
              <div className={cx('cart')}>
                <Link to="/cart">
                  <img alt="" src={cart} />
                </Link>
                <span className={cx('cart-count')} style={{ display: cartCount > 0 ? 'block' : 'none' }}>
                  {cartCount}
                </span>
              </div>
              <div className={cx('btn-sign-in')}>
                <button className={cx('block')}>Đăng nhập</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
