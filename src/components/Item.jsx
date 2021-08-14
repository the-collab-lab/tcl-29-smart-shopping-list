import React from 'react';
import db from '../lib/firebase';
import calculateEstimate from '../lib/estimates';

const Item = ({
  name,
  id,
  nextPurchase,
  lastPurchasedDate,
  numberOfPurchases,
}) => {
  const checkHandler = async () => {
    if (lastPurchasedDate === null || !checked) {
      let nextPurchaseEstimate = getPurchaseInterval();
      await db
        .collection('items')
        .doc(id)
        .update({
          lastPurchasedDate: new Date(),
          numberOfPurchases: numberOfPurchases + 1,
          nextPurchase: nextPurchaseEstimate,
        });
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

  const getPurchaseInterval = () => {
    let lastEstimate = nextPurchase;
    let latestInterval =
      lastPurchasedDate != null
        ? Math.floor(
            // convert from date to seconds
            (new Date().getTime() / 1000 - lastPurchasedDate.seconds) /
              // convert from seconds to day
              (60 * 60 * 24),
          )
        : lastEstimate;
    let estimatedInterval = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );
    return estimatedInterval;
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
