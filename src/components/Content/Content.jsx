import React from 'react';

import { Card } from '../Card/Card';

import classes from './Content.module.scss';

const arr = [
  { title: "Men's sneakers Nike Blazer Mid Suede", imgURL: '../../img/sneakers/1.jpg', price: '250' },
  { title: "Men's sneakers Nike Blazer Mid Suede", imgURL: '../../img/sneakers/2.jpg', price: '235' },
  { title: "Men's sneakers Nike Blazer Mid Suede", imgURL: '../../img/sneakers/3.jpg', price: '185' },
  { title: "Men's sneakers Nike Blazer Mid Suede", imgURL: '../../img/sneakers/4.jpg', price: '150' },
];

export const Content = () => {
  return (
    <div className={classes.content}>
      <div className={classes.content__search__group}>
        <h1>All Sneakers</h1>
        <div className={classes.content__search}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z"
              stroke="#E4E4E4"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
          <input placeholder="Search..." />
        </div>
      </div>
      {arr.map((val) => (
        <Card
          title={val.title}
          price={val.price}
          imgURL={val.imgURL}
          onPlusClick={() => console.log("plus")}
          onAddFav={() => console.log("favorite")}
        />
      ))}
    </div>
  );
};
