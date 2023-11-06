import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Card } from './components/Card/Card';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

import Search from './img/search.svg';
import classes from './app.module.scss';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get('https://653a0702e3b530c8d9e8fc2d.mockapi.io/items').then((res) => {
      setItems(res.data);
    });

    axios.get('https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  //cart

  const onAddToCard = (obj) => {
    axios.post('https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveCart = (id) => {
    axios.delete(`https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  //search

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      {cartOpened && (
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveCart}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
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
            .filter((val) => val.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((val) => (
              <Card
                key={val.id}
                title={val.title}
                price={val.price}
                imageURL={val.imageURL}
                onPlusClick={(obj) => onAddToCard(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
