import { Content } from './components/Content/Content';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

import classes from './app.module.scss';
import { useState } from 'react';

function App() {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <div className={classes.wrapper}>
      {cartOpened && <Drawer onCloseCart={() => setCartOpened(false)} />}

      <Header onClickCart={() => setCartOpened(true)} />
      <Content />
    </div>
  );
}

export default App;
