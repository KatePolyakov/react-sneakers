import React from 'react';
import { Card } from '../components/Card/Card';

import Search from '../img/search.svg';

import classes from './Home.module.scss';

function Home({ items, searchValue, setSearchValue, onChangeSearchValue, onAddToCart, cartItems }) {
  // const renderItems = () => {
  //   const filtredItems = items.filter((item) =>
  //     item.title.toLowerCase().includes(searchValue.toLowerCase()),
  //   );
  //   return filtredItems.map((item, index) => (
  //     <Card
  //       key={index}
  //       onPlus={(obj) => onAddToCard(obj)}
  //       {...item}
  //     />
  //   ));
  // };
  return (
    <div className={classes.content}>
      <div className={classes.content__search__group}>
        <h1>{searchValue ? `Search: "${searchValue}"` : 'All Sneakers'}</h1>
        <div className={classes.content__search}>
          <img src={Search} alt="Search" />
          <input onChange={onChangeSearchValue} value={searchValue} placeholder="Search..." />
        </div>
      </div>
      <div className={classes.content__items}>
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card
              key={item.id}
              onPlusClick={(obj) => onAddToCart(obj)}
              addedCart={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
              {...item}
              // title={item.title}
              // price={item.price}
              // imageURL={item.imageURL}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
