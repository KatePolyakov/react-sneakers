import React, { useContext } from 'react';

import AppContext from '../../Context';

import classes from './Info.module.scss';

const Info = ({ image, title }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className={classes.drawer__empty}>
      <h3>{title}</h3>
      <img src={image} alt="Cart" />
      <button onClick={() => setCartOpened(false)}>To main menu</button>
    </div>
  );
};

export default Info;
