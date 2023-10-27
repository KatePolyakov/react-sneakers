import { Content } from './components/Content/Content';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

import classes from './app.module.scss';
import { useState } from 'react';

function App() {
  const [cartOpened, setCartOpened] = useState(false);

  const [cartItems, setCartItems] = useState([{
    "title": "Sneakers Nike Blazer Mid Suede",
    "imageURL": "/img/sneakers/1.jpg",
    "price": "150",
    "id": "1"
  },
  {
    "title": "Sneakers Nike Air Max 270",
    "imageURL": "/img/sneakers/2.jpg",
    "price": "210",
    "id": "2"
  }]);

  return (
    <div className={classes.wrapper}>
      {cartOpened && <Drawer items={cartItems} onCloseCart={() => setCartOpened(false)} />}

      <Header onClickCart={() => setCartOpened(true)} />
      <Content />
    </div>
  );
}

export default App;
