import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

import classes from './app.module.scss';
import Home from './pages/Home';


function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      
      const cartResponse = await axios.get('https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart');

      const itemsResponse = await axios.get('https://653a0702e3b530c8d9e8fc2d.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    // console.log('obj', obj);
    // console.log('carts', cartItems);
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios
        .post('https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart', obj)
        .then((res) => setCartItems((prev) => [...prev, res.data]));
    }
  };

  const onRemoveCart = (id) => {
    axios.delete(`https://653a0702e3b530c8d9e8fc2d.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
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

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchValue={onChangeSearchValue}
              onAddToCart={onAddToCart}
              isLoading={isLoading}
            />
          }
          exact
        />
      </Routes>
    </div>
  );
}

export default App;
