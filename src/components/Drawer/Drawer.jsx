import React, { useState } from 'react';
import axios from 'axios';

import Info from '../Info/Info';

import Remove from '../../img/btn-remove.svg';
import emptyCard from '../../img/empty-cart.jpg';
import completeOrder from '../../img/complete-order.jpg';

import classes from './Drawer.module.scss';
import { useCart } from '../Hooks/useCart';

export const Drawer = ({ onCloseCart, onRemove, items = [] }) => {
  const {cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [idOrder, setIdOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

  

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://450e36acc987c717.mokky.dev/orders', {
        items: cartItems,
      });

      setIdOrder(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);
      for (let i=0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://450e36acc987c717.mokky.dev/cart/' + item.id);
      }
    } catch (error) {
      alert("We can't place your order :(");
    }
    setIsLoading(false);
  };
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
                <div className={classes.drawer__cartItem} id={obj.idItem}>
                  <img src={obj.imageURL} alt="Sneaker photo_preview" />
                  <div className={classes.drawer__cartItem__priceGroup}>
                    <p>{obj.title}</p>
                    <p>
                      <span>${obj.price}</span>
                    </p>
                  </div>
                  <button onClick={() => onRemove(obj.idItem)}>
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
                    <span>${totalPrice}</span>
                  </p>
                </li>
                <li className={classes.drawer__cartSum}>
                  <p>TAX 12%: </p>
                  <div></div>
                  <p>
                    <span>${(totalPrice / 100 * 12).toFixed(2)}</span>
                  </p>
                </li>
              </ul>

              <button onClick={onClickOrder} disabled={isLoading}>
                Place your order
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={
              isOrderCompleted
                ? `The order #${idOrder} has been placed`
                : 'Your cart is still empty. Why??'
            }
            image={isOrderCompleted ? completeOrder : emptyCard}
          />
        )}
      </div>
    </div>
  );
};
