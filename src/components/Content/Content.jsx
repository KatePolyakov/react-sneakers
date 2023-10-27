import React, { useState } from 'react';

import { Card } from '../Card/Card';

import classes from './Content.module.scss';

export const Content = () => {
  const [items, setItems] = useState([
    {
      title: 'Sneakers Nike Blazer Mid Suede',
      imageURL: '/img/sneakers/1.jpg',
      price: '150',
      id: '1',
    },
    {
      title: 'Sneakers Nike Air Max 270',
      imageURL: '/img/sneakers/2.jpg',
      price: '210',
      id: '2',
    },
    {
      title: 'Sneakers Nike Blazer Mid Suede',
      imageURL: '/img/sneakers/3.jpg',
      price: '150',
      id: '3',
    },
    {
      title: 'Sneakers Puma X Aka Boku Future Rider',
      imageURL: '/img/sneakers/4.jpg',
      price: '85',
      id: '4',
    },
    {
      title: 'Sneakers Under Armour Curry 8',
      imageURL: '/img/sneakers/5.jpg',
      price: '105',
      id: '5',
    },
    {
      title: 'Sneakers Nike Kyrie 7',
      imageURL: '/img/sneakers/6.jpg',
      price: '140',
      id: '6',
    },
    {
      title: 'Sneakers Jordan Air Jordan 11',
      imageURL: '/img/sneakers/7.jpg',
      price: '240',
      id: '7',
    },
    {
      title: 'Sneakers Nike Lebron XVIII Low',
      imageURL: '/img/sneakers/8.jpg',
      price: '400',
      id: '8',
    },
    {
      title: 'Sneakers Nike Blazer Mid Suede',
      imageURL: '/img/sneakers/9.jpg',
      price: '145',
      id: '9',
    },
    {
      title: 'Sneakers Puma X Aka Boku Future Rider',
      imageURL: '/img/sneakers/10.jpg',
      price: '97',
      id: '10',
    },
    {
      title: "Men's Sneakers Nike Kyrie Flytrap IV",
      imageURL: '/img/sneakers/11.jpg',
      price: '179',
      id: '11',
    },
    {
      title: 'Sneakers Nike LeBron XVIII',
      imageURL: '/img/sneakers/12.jpg',
      price: '450',
      id: '12',
    },
  ]);
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
      <div className={classes.content__items}>
        {items.map((val) => (
          <Card
            title={val.title}
            price={val.price}
            imageUrl={val.imageURL}
            onPlusClick={() => console.log('plus')}
            onAddFav={() => console.log('favorite')}
          />
        ))}
      </div>
    </div>
  );
};
