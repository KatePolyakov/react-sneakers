import React from 'react';
import { Card } from '../components/Card/Card';

import Search from '../img/search.svg';

import classes from './Home.module.scss';

function Home({items, searchValue, setSearchValue, onChangeSearchValue, onAddToCart}) {
  

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
          .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item) => (
            <Card
              key={item.id}
              title={item.title}
              price={item.price}
              imageURL={item.imageURL}
              onPlusClick={(obj) => onAddToCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
