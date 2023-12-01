import React, { useState } from 'react';

import unliked from '../../img/unliked.svg';
import liked from '../../img/liked.svg';
import plus from '../../img/btn-plus.svg';
import checked from '../../img/btn-checked.svg';

import classes from './Card.module.scss';

export const Card = ({ id, imageURL, title, price, onPlusClick, addedCart=false }) => {
  const [isAdded, setIsAdded] = useState(addedCart);
  const [isFavourite, setIsFavourite] = useState(false);

  const onClickPlus = () => {
    onPlusClick({ id, imageURL, title, price });
    setIsAdded(!isAdded);
  };

  const onClickFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={classes.content__card}>
      <div className={classes.content__card__wrapper}>
        <div className={classes.content__favorite}>
          <button type="button" onClick={onClickFavourite}>
            {isFavourite ? <img src={liked} alt="liked" /> : <img src={unliked} alt="unliked" />}
          </button>
        </div>
        <img src={imageURL} alt="Sneakers_" />
        <p>{title}</p>
        <div className={classes.content__card__wrapper__group}>
          <div className={classes.content__card__wrapper__price}>
            <p>
              <span>Price:</span>
            </p>
            <p>${price}</p>
          </div>
          <button type="button" onClick={onClickPlus}>
            {isAdded === true ? (
              <img src={checked} alt='checked' />
            ) : (
              <img src={plus} alt='plus' />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
