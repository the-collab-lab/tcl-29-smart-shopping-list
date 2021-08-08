import React from 'react';
import db from '../lib/firebase';

const Item = ({ name, id, lastPurchasedDate }) => {
  const checkHandler = () => {
    if (lastPurchasedDate === null || !checked) {
      db.collection('items').doc(id).update({ lastPurchasedDate: new Date() });
    }
  };

  const checkDate = (lastPurchasedDate) => {
    if (lastPurchasedDate === null) {
      return false;
    } else {
      const day = 60 * 60 * 24;
      const now = Date.now() / 1000;
      return now - lastPurchasedDate.seconds < day;
    }
  };
  const checked = checkDate(lastPurchasedDate);
  const className = checked ? 'checked' : '';
  return (
    <div className="check-item">
      <input type="checkbox" onChange={checkHandler} checked={checked} />
      <li className={className}>{name}</li>
    </div>
  );
};

export default Item;
