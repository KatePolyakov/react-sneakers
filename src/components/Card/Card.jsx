import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';

import unliked from '../../img/unliked.svg';
import liked from '../../img/liked.svg';
import plus from '../../img/btn-plus.svg';
import checked from '../../img/btn-checked.svg';

import classes from './Card.module.scss';


export const Card = ({
  id,
  imageURL,
  title,
  price,
  onPlusClick,
  addedCart = false,
  loading = false,
}) => {
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
      {loading ? (
        <ContentLoader
          speed={2}
          width={213}
          height={257}
          viewBox="0 0 213 257"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="34" y="20" rx="0" ry="0" width="133" height="112" />
          <rect x="34" y="157" rx="5" ry="5" width="155" height="15" />
          <rect x="34" y="177" rx="5" ry="5" width="100" height="15" />
          <rect x="34" y="214" rx="5" ry="5" width="80" height="25" />
          <rect x="155" y="210" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
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
                <img src={checked} alt="checked" />
              ) : (
                <img src={plus} alt="plus" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
