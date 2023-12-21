import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';
import AppContext from './Context';
import Home from './pages/Home/Home';
import { Orders } from './pages/Orders/Orders';

import classes from './app.module.scss';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          axios.get('https://450e36acc987c717.mokky.dev/cart'),
          axios.get('https://450e36acc987c717.mokky.dev/items')
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Error');
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      // console.log('obj', obj);
      // console.log('carts', cartItems);
      if (cartItems.find((item) => item.idItem === obj.idItem)) {
        await axios.delete(`https://450e36acc987c717.mokky.dev/cart/${obj.idItem}`);
        setCartItems((prev) => prev.filter((item) => item.idItem !== obj.idItem));
        //console.log('obj', obj);
      } else {
        await axios
          .post('https://450e36acc987c717.mokky.dev/cart', obj)
          .then((res) => setCartItems((prev) => [...prev, res.data]));
      }
    } catch (error) {
      alert('Error');
    }
  };

  const onRemoveCart = async (idItem) => {
    try {
      await axios.delete(`https://450e36acc987c717.mokky.dev/cart/${idItem}`);
      setCartItems((prev) => prev.filter((item) => item.idItem !== idItem));
    } catch (error) {
      alert('Error');
      console.error(error);
    }
  };

  //search

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  const getAddedItems = (idItem) => {
    return cartItems.some((obj) => obj.idItem === idItem);
  };

  return (
    <AppContext.Provider
      value={{ items, cartItems, getAddedItems, setCartItems, setCartOpened, onAddToCart }}>
      <div className={classes.wrapper}>
        <Drawer
          items={cartItems}
          onCloseCart={() => setCartOpened(false)}
          onRemove={onRemoveCart}
          opened={cartOpened}
        />

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
          <Route path="/orders" element={<Orders />} exact />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
