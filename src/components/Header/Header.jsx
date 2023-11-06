import logo from '../../img/logo.png';
import cart from '../../img/cart.svg';
import user from '../../img/user.svg';

import classes from './Header.module.scss';

export const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.header__left}>
        <img src={logo} alt="Logo_Shop" />
        <div className={classes.header__left__info}>
          <h3>React Sneakers</h3>
          <p>The Best Sneakers Shop</p>
        </div>
      </div>
      <div className={classes.header__right}>
        <div className={classes.header__right__wrapper}>
          <button onClick={props.onClickCart}>
            <img src={cart} alt="cart" />
            <p>$250</p>
          </button>
        </div>
        <div className={classes.header__right__wrapper}>
          <img src={user} alt="user" />
          <p>Profile</p>
        </div>
      </div>
    </header>
  );
};
