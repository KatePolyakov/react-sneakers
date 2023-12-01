import React from 'react';

import emptyCard from '../../img/empty-cart.jpg';

import Remove from '../../img/btn-remove.svg';
import classes from './Drawer.module.scss';

export const Drawer = ({ onCloseCart, onRemove, items = [] }) => {
  return (
    <div className={classes.drawer}>
      <div className={classes.drawer__wrapper}>
        <div className={classes.drawer__wrapper__header}>
          <h2>Cart</h2>
          <button onClick={onCloseCart}>
            <img src={Remove} alt="remove" />
          </button>
        </div>

        {items.length > 0 ? (
          <div>
            <div className={classes.drawer__cartItems}>
              {items.map((obj) => (
                <div className={classes.drawer__cartItem} id={obj.id}>
                  <img src={obj.imageURL} alt="Sneaker photo_preview" />
                  <div className={classes.drawer__cartItem__priceGroup}>
                    <p>{obj.title}</p>
                    <p>
                      <span>${obj.price}</span>
                    </p>
                  </div>
                  <button onClick={() => onRemove(obj.id)}>
                    <img className={classes.remove} src={Remove} alt="remove" />
                  </button>
                </div>
              ))}
            </div>
            <div className={classes.drawer__cartTotal}>
              <ul>
                <li className={classes.drawer__cartSum}>
                  <p>TOTAL: </p>
                  <div></div>
                  <p>
                    <span>$250</span>
                  </p>
                </li>
                <li className={classes.drawer__cartSum}>
                  <p>TAX 12%: </p>
                  <div></div>
                  <p>
                    <span>$35</span>
                  </p>
                </li>
              </ul>

              <button>Place your order</button>
            </div>
          </div>
        ) : (
          <div className={classes.drawer__empty}>
            <h3>
              Your cart is still empty.
              <br /> Why??
            </h3>
            <img src={emptyCard} alt="Empty cart" />
          </div>
        )}
      </div>
    </div>
  );
};
