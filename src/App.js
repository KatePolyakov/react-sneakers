import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from './components/Card/Card';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
                stroke="#E4E4E4"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
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
                // onAddFav={() => console.log('favorite')}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
