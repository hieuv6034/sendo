import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UnChecked from '../../comon/component/UnChecked';
import Checked from '../../comon/component/Checked';
import CheckSort from '../../comon/component/checkSort';
import UnCheckSort from '../../comon/component/uncheckSort';
import Exspand from '../../comon/component/exspand';
import Collapse from '../../comon/component/collapse';
import { filter } from '../../data/filterData';
import { data } from '../../data/productData';
import styles from '../../assets/css/productListBody.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const numberWithCommas = (x) => {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return '';
};

const checkPercent = (x) => {
  if (x !== undefined) {
    return `-${x}%`;
  }
  return '';
};

const checkPrice = (x) => {
  if (x !== undefined) {
    return `${numberWithCommas(x)}đ`;
  }
  return '';
};

const Body = () => {
  const [name, setName] = useState('');
  const [conditionFilter, setConditionFilter] = useState([]);
  const [sortSelect, setSortSelect] = useState(false);
  const [sortValue, setSortValue] = useState('Đề cử');
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [exspandFilters, setExspandFilters] = useState([]);
  const [viewAllFilters, setViewAllFilters] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const showSortSelect = () => {
    const sortSelectElement = document.getElementById('sort-select');
    const sortDivElement = document.querySelector('.sort>div');

    if (sortSelectElement && sortDivElement) {
      if (!sortSelect) {
        setSortSelect(true);
        sortSelectElement.style.display = 'block';
        sortDivElement.style.boxShadow = '0 0 0 1px #3f81fe';
        sortDivElement.style.borderColor = '#3f81fe';
      } else {
        setSortSelect(false);
        sortSelectElement.style.display = 'none';
        sortDivElement.style.border = '1px solid #cfd2d4';
      }
    }
  };

  const handleViewAllFilter = (value) => {
    if (viewAllFilters.includes(value)) {
      setViewAllFilters((prevFilters) => prevFilters.filter((filter) => filter !== value));
    } else {
      setViewAllFilters((prevFilters) => [...prevFilters, value]);
    }
  };

  const handleExspand = (value) => {
    if (exspandFilters.includes(value)) {
      setExspandFilters((prevExspands) => prevExspands.filter((exspand) => exspand !== value));
    } else {
      setExspandFilters((prevExspands) => [...prevExspands, value]);
    }
  };

  const isInArray = (value, array) => {
    return array.indexOf(value) > -1;
  };

  const removeElement = (array, elem) => {
    const index = array.indexOf(elem);
    if (index > -1) {
      array.splice(index, 1);
    }
  };

  const selectFilter = async (event, value) => {
    setIsLoaded(false);
    try {
      const pushArr = [...conditionFilter];
      if (isInArray(value, pushArr)) {
        removeElement(pushArr, value);
      } else {
        pushArr.push(value);
      }
      const response = await fetch('https://backend-sendo.onrender.com/products/' + pushArr);
      const product = await response.json();
      setData(product);
      document.getElementById('ads-product').style.display = 'none';
      setConditionFilter(pushArr);
    } catch (err) {
      console.log(err);
    }
  };

  const selectSort = async (value) => {
    setIsLoaded(false);
    try {
      let response;
      if (conditionFilter.length !== 0) {
        response = await fetch(`https://backend-sendo.onrender.com/sort/${value}/${conditionFilter}`);
      } else {
        response = await fetch(`https://backend-sendo.onrender.com/all/${value}`);
      }
      const product = await response.json();
      setData(product);
      setIsLoaded(true);
      setSortValue(value);
      setSortSelect(false);
      document.getElementById('sort-select').style.display = 'none';
      document.querySelector('.sort>div').style = 'border: 1px solid #cfd2d4;';
      document.getElementById('ads-product').style.display = 'none';
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-sendo.onrender.com/products');
        const product = await response.json();
        setData(product);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((item) => name === '' || item.name.includes(name));

  return (
    <div className={cx('body', '.not-black-out')}>
      <div className={cx('content')}>
        <div className={cx('top-body')}>
          <div className={cx('top-body-title')}>
            <Link to={`/`}> Sendo.vn</Link>/<span>Giày</span>
          </div>
          <div className={cx('top-body-result')}>
            <span>Giày nam</span>Tìm thấy hơn 10.000 sản phẩm
          </div>
        </div>
        <div className={cx('main-body')}>
          <div className={cx('right-body')}>
            {filter.map((item, index) => {
              if (
                item.attribute_name &&
                item.attribute_name !== 'Màu sắc' &&
                item.attribute_name !== 'Khoảng giá' &&
                item.attribute_name !== 'Đánh giá'
              ) {
                return (
                  <React.Fragment key={index}>
                    <div className={cx('item-filter')}>
                      <div className={cx('header-filter')}>
                        <span>{item.attribute_name}</span>
                        <button className={cx('block')} onClick={(event) => handleExspand(item.attribute_name)}>
                          {exspandFilters?.includes(item.attribute_name) ? <Exspand /> : <Collapse />}
                        </button>
                      </div>
                      {!exspandFilters?.includes(item.attribute_name) ? (
                        <div className={cx('body-filter')}>
                          {viewAllFilters?.includes(item.attribute_name) ? (
                            <>
                              {item.attribute_value.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={cx('body-filter-item')}
                                    onClick={(event) => selectFilter(event, item.option_name)}
                                  >
                                    {conditionFilter?.includes(item.option_name) ? <Checked /> : <UnChecked />}
                                    <span>{item.option_name}</span>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              {item.attribute_value.slice(0, 4).map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={cx('body-filter-item')}
                                    onClick={(event) => selectFilter(event, item.option_name)}
                                  >
                                    {conditionFilter?.includes(item.option_name) ? <Checked /> : <UnChecked />}
                                    <span>{item.option_name}</span>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}

                      {item.attribute_value.length < 5 ? (
                        <></>
                      ) : (
                        <>
                          <div className={cx('footer-filter')} onClick={() => handleViewAllFilter(item.attribute_name)}>
                            {viewAllFilters?.includes(item.attribute_name) ? (
                              <div className={cx('footer-filter-item')}>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  version="1.1"
                                  xlink="http://www.w3.org/1999/xlink"
                                >
                                  <path fill="#3f4b53" fillRule="nonzero" d="M22 11v2H2v-2z"></path>
                                </svg>
                                <span>Thu gọn</span>
                              </div>
                            ) : (
                              <div className={cx('footer-filter-item')}>
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  version="1.1"
                                  xlink="http://www.w3.org/1999/xlink"
                                >
                                  <path fill="#3f4b53" fillRule="nonzero" d="M13 11h9v2h-9v9h-2v-9H2v-2h9V2h2z"></path>
                                </svg>
                                <span>Xem thêm</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <hr />
                  </React.Fragment>
                );
              }
            })}
            <div className={cx('item-filter')}>
              <div className={cx('header-filter')}>
                <span>Khoảng giá</span>
                <button className={cx('block')}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      fill="#3f4b53"
                      fillRule="nonzero"
                      d="M12 10.786L6.476 16 5 14.607 12 8l7 6.607L17.524 16z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className={cx('body-filter ', ' filter-gia')}>
                <div className={cx('input-price-block')}>
                  <div>
                    <div className={cx('input-price')}>
                      <span>Thấp nhất</span>
                      <input />
                    </div>
                    <span>{'-'}</span>
                    <div className={cx('input-price')}>
                      <span>Cao nhất</span>
                      <input />
                    </div>
                  </div>
                  <button>Áp dụng</button>
                </div>
                <div className={cx('select-price')}>
                  <span>Dưới 200K</span>
                  <span>200K - 250K</span>
                  <span>250K - 550K</span>
                  <span>550K - 1M</span>
                </div>
                <div className={cx('footer-filter')}>
                  <div className={cx('footer-filter-item')}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xlink="http://www.w3.org/1999/xlink"
                    >
                      <path fill="#3f4b53" fillRule="nonzero" d="M13 11h9v2h-9v9h-2v-9H2v-2h9V2h2z"></path>
                    </svg>
                    <span>Xem thêm </span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className={cx('item-filter')}>
              <div className={cx('header-filter')}>
                <span>Đánh giá</span>
                <button className={cx('block')}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      fill="#3f4b53"
                      fillRule="nonzero"
                      d="M12 10.786L6.476 16 5 14.607 12 8l7 6.607L17.524 16z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className={cx('body-filter', ' filter-gia ', ' filter-star')}>
                <div className={cx('select-price')}>
                  <span>5 sao</span>
                  <span>{'4-5 sao'}</span>
                  <span>{'3-5 sao'}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className={cx('item-filter')}>
              <div className={cx('header-filter')}>
                <span>Màu sắc</span>
                <button className={cx('block')}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      fill="#3f4b53"
                      fillRule="nonzero"
                      d="M12 10.786L6.476 16 5 14.607 12 8l7 6.607L17.524 16z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className={cx('body-filter ', 'filter-color', ' filter-gia')}>
                <button style={{ backgroundColor: 'rgb(128, 64, 0)' }}></button>
                <button style={{ backgroundColor: '#fff' }}></button>
                <button style={{ backgroundColor: 'rgb(153, 153, 153)' }}></button>
                <button style={{ backgroundColor: '#333' }}></button>
                <button style={{ backgroundColor: 'rgb(0, 112, 0)' }}></button>
                <button style={{ backgroundColor: 'rgb(255, 255, 0)' }}></button>
                <button style={{ backgroundColor: 'rgb(17, 44, 78)' }}></button>
                <button style={{ backgroundColor: 'rgb(0, 128, 255)' }}></button>
                <button style={{ backgroundColor: 'rgb(255, 0, 0)' }}></button>
                <button style={{ backgroundColor: 'rgb(255, 128, 64)' }}></button>
              </div>
            </div>
            <hr />
          </div>
          <div className={cx('left-body')}>
            <div className={cx('sort')}>
              <span>Sắp xếp theo:</span>
              <div className={cx('block', 'not-black-out')}>
                <div className={cx('sort-default', 'block')} onClick={(event) => showSortSelect(event)}>
                  <div>{sortValue}</div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      fill="#6F787E"
                      fillRule="nonzero"
                      d="M12 13.214L6.476 16 5 14.607 12 8l7 6.607L17.524 16z"
                    ></path>
                  </svg>
                </div>
                <div className={cx('sort-select', 'block')} id="sort-select">
                  <div className={cx('sort-select-item')} onClick={() => selectSort('Đề cử')}>
                    <span>Đề cử</span>
                    {sortValue?.includes('Đề cử') ? <CheckSort /> : <UnCheckSort />}
                  </div>
                  <div className={cx('sort-select-item')} onClick={() => selectSort('Bán chạy')}>
                    <span>Bán chạy</span>
                    {sortValue?.includes('Bán chạy') ? <CheckSort /> : <UnCheckSort />}
                  </div>
                  <div className={cx('sort-select-item')} onClick={() => selectSort('Giá thấp')}>
                    <span>Giá thấp</span>
                    {sortValue?.includes('Giá thấp') ? <CheckSort /> : <UnCheckSort />}
                  </div>
                  <div className={cx('sort-select-item')} onClick={() => selectSort('Giá cao')}>
                    <span>Giá cao</span>
                    {sortValue?.includes('Giá cao') ? <CheckSort /> : <UnCheckSort />}
                  </div>
                  <div className={cx('sort-select-item')} onClick={() => selectSort('Lượt yêu thích')}>
                    <span>Lượt yêu thích</span>
                    {sortValue?.includes('Lượt yêu thích') ? <CheckSort /> : <UnCheckSort />}
                  </div>
                </div>
              </div>
            </div>

            <div className={cx('all-product')}>
              {filteredData.map((item, index) => {
                return (
                  <div key={index} className={cx('product-item')}>
                    <Link to={`/products/${item.id}`}>
                      <img alt="" src={item?.image} />
                      <div className={cx('info-product')}>
                        <div className={cx('branch')}>
                          <img alt="" src="https://media3.scdn.vn/img4/2021/10_21/mFcIndYzGOkBpNH6w5oN.png" />
                        </div>
                        <div className={cx('name')}>
                          <img alt="" src="https://media3.scdn.vn/img4/2020/07_30/h6fJaiL5WkEbDU2eQRZb.png" />
                          <span>{item?.name}</span>
                        </div>
                        <div className={cx('sale')}>
                          <span>{`${numberWithCommas(item?.default_price_min)}đ`}</span>
                          <div>{checkPercent(item?.sale_percent)}</div>
                        </div>
                        <div className={cx('price')}>{`${numberWithCommas(item?.sale_price_max)}đ`}</div>
                        <div className={cx('tra-gop')}>
                          <img alt="" src="https://media3.scdn.vn/img4/2022/06_24/V5PHsdxRbMf35yH1KO0h.png" />
                          Trả góp Kredivoa
                        </div>
                        <div className={cx('sold')}>Đã bán {item?.sold}</div>
                        <div className={cx('quality')}>
                          <div>
                            <span>{item?.rated?.star}/5</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              xlink="http://www.w3.org/1999/xlink"
                            >
                              <path
                                fill="#FFCC00"
                                fillRule="nonzero"
                                d="M12 17.25l-3.408 1.742.651-3.786-2.757-2.68 3.805-.552L12 8.25l1.709 3.474 3.805.552-2.757 2.68.651 3.786z"
                              ></path>
                            </svg>
                          </div>
                          <div className={cx('rating')}>{item?.rated?.total} Đánh giá</div>
                        </div>
                      </div>
                    </Link>

                    <div className={cx('end')}></div>
                  </div>
                );
              })}
              {filteredData.length !== 0 ? (
                <div className={cx('footer-sidebar')}>
                  <button className={cx('btn-xem-them-product')}>Xem thêm</button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={cx('btn-chat-support', 'block')}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xlink="http://www.w3.org/1999/xlink"
                color="#fff"
                class="d7ed-SwZDZ2"
              >
                <path
                  d="M20 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7.913L6 21.804V18H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16Zm0 2H4v12h4v2.196L11.513 16H20V4Zm-6 7v2H7v-2h7Zm2-4v2H7V7h9Z"
                  fill="#fff"
                  fill-rule="nonzero"
                ></path>
              </svg>
              <span>Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
