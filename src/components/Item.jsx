import React, { useState, useEffect } from 'react';
import db from '../lib/firebase';

const Item = ({ name, id, key }) => {
  const [purchased, setPurchased] = useState(false);
  const [purchaseTime, setPurchaseTime] = useState(null);
  const className = purchased ? 'completed' : '';
  const checkHandler = () => {
    db.collection('items').doc(id).update({ lastPurchasedDate: new Date() });
    checkDate();
  };

  const checkDate = () => {
    db.collection('items')
      .doc(id)
      .get()
      .then((snapshot) => {
        let time = snapshot.data().lastPurchasedDate.seconds;
        setPurchaseTime(time);
      });

    const day = 60 * 60 * 24;
    const now = Date.now() / 1000;
    const checked = now - purchaseTime < day;
    setPurchased(checked);
  };

  return (
    <div className="check-item">
      <input type="checkbox" onChange={checkHandler} checked={purchased} />
      <li className={className} key={key}>
        {name}
      </li>
    </div>
  );
};

export default Item;
