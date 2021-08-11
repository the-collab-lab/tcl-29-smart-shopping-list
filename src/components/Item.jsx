import React from 'react';
import db from '../lib/firebase';
import calculateEstimate from '../lib/estimates';

const Item = ({
  name,
  id,
  frequency,
  lastPurchasedDate,
  numberOfPurchases,
}) => {
  const checkHandler = async () => {
    if (lastPurchasedDate === null || !checked) {
      let purchased = numberOfPurchases + 1;
      let purchaseInterval = getPurchaseInterval();
      await db.collection('items').doc(id).update({
        lastPurchasedDate: new Date(),
        numberOfPurchases: purchased,
        daysBetweenPurchases: purchaseInterval,
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
    let lastEstimate = frequency;
    let latestInterval =
      lastPurchasedDate != null
        ? Math.floor(
            // convert from date to seconds
            (new Date().getTime() / 1000 - lastPurchasedDate.seconds) /
              // convert from seconds to day
              (60 * 60 * 24),
          )
        : lastEstimate;
    console.log('lastEstimate', lastEstimate);
    console.log('latestInterval', latestInterval);
    console.log('numberOfPurchases', numberOfPurchases);
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
