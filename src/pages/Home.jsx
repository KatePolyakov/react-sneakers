import React from 'react';
import { Card } from '../components/Card/Card';

import Search from '../img/search.svg';

import classes from './Home.module.scss';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchValue,
  onAddToCart,
  cartItems,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onPlusClick={(obj) => onAddToCart(obj)}
        addedCart={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item}
        // title={item.title}
        // price={item.price}
        // imageURL={item.imageURL}
      />
    ));
  };
  return (
    <div className={classes.content}>
      <div className={classes.content__search__group}>
        <h1>{searchValue ? `Search: "${searchValue}"` : 'All Sneakers'}</h1>
        <div className={classes.content__search}>
          <img src={Search} alt="Search" />
          <input onChange={onChangeSearchValue} value={searchValue} placeholder="Search..." />
        </div>
      </div>
      <div className={classes.content__items}>{renderItems()}</div>
    </div>
  );
}

export default Home;
