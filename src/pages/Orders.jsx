import { useEffect, useState } from 'react';
import { Card } from '../components/Card/Card';
import axios from 'axios';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://450e36acc987c717.mokky.dev/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
        // console.log(data.map((obj) => obj.items).flat());
      } catch (error) {
        alert('Error');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div>
      <div>
        <h2>My orders</h2>
        <div>
          {isLoading
            ? [...Array(8)]
            : orders.map((item, index) => (
                <Card
                  key={index}
                  loading={isLoading}
                  {...item}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
