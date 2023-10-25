import { Content } from './components/Content/Content';
import { Drawer } from './components/Drawer/Drawer';
import { Header } from './components/Header/Header';

import classes from './app.module.scss';



function App() {
  return (
    <div className={classes.wrapper}>
      <Drawer />
      <Header />
      <Content />
    </div>
  );
}

export default App;
