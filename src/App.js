import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';
import AppContext from './Context';
import Home from './pages/Home';

import classes from './app.module.scss';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://450e36acc987c717.mokky.dev/cart');

      const itemsResponse = await axios.get('https://450e36acc987c717.mokky.dev/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    // console.log('obj', obj);
    // console.log('carts', cartItems);
    if (cartItems.find((item) => item.idItem === obj.idItem)) {
      axios.delete(`https://450e36acc987c717.mokky.dev/cart/${obj.idItem}`);
      setCartItems((prev) => prev.filter((item) => item.idItem !== obj.idItem));
      console.log('obj', obj);
    } else {
      axios
        .post('https://450e36acc987c717.mokky.dev/cart', obj)
        .then((res) => setCartItems((prev) => [...prev, res.data]));
    }
  };

  const onRemoveCart = (idItem) => {
    axios.delete(`https://450e36acc987c717.mokky.dev/cart/${idItem}`);
    setCartItems((prev) => prev.filter((item) => item.idItem !== idItem));
  };

  //search

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    console.log(event.target.value);
  };

  const getAddedItems = (idItem) => {
    return cartItems.some((obj) => obj.idItem === idItem);
  };

  return (
    <AppContext.Provider value={{ items, cartItems, getAddedItems, setCartItems, setCartOpened }}>
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
    </AppContext.Provider>
  );
}

export default App;
