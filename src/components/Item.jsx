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
  const oneDayInSeconds = 60 * 60 * 24;

  const checkHandler = () => {
    if (lastPurchasedDate === null || !checked) {
      db.collection('items')
        .doc(id)
        .update({
          lastPurchasedDate: new Date(),
          numberOfPurchases: numberOfPurchases + 1,
          nextPurchase: getPurchaseInterval(),
        });
    }
  };
  const calculateLatestInterval = () => {
    let currentDate = new Date().getTime();

    let interval =
      (currentDate / 1000 - lastPurchasedDate.seconds) / oneDayInSeconds;
    return interval;
  };

  const getPurchaseInterval = () => {
    let lastEstimate = nextPurchase;
    let latestInterval =
      lastPurchasedDate != null ? calculateLatestInterval() : lastEstimate;
    let estimatedInterval = calculateEstimate(
      lastEstimate,
      latestInterval,
      numberOfPurchases,
    );
    return estimatedInterval;
  };

  const checkDate = (lastPurchasedDate) => {
    if (lastPurchasedDate === null) {
      return false;
    } else {
      const now = Date.now() / 1000;
      return now - lastPurchasedDate.seconds < oneDayInSeconds;
    }
  };

  const checked = checkDate(lastPurchasedDate);
  const checkedClassName = checked ? 'checked' : '';

  const groupItemClassName = () => {
    if (
      lastPurchasedDate != null &&
      calculateLatestInterval() >= 2 * nextPurchase
    ) {
      return 'inactive';
    }
    switch (true) {
      case nextPurchase < 7:
        return 'soon';
      case nextPurchase >= 7 && nextPurchase <= 30:
        return 'kind-of-soon';
      default:
        return 'not-so-soon';
    }
  };

  const setARIA = (className) => {
    if (className === 'inactive') {
      return `${name} is inactive`;
    } else {
      return `${name} will need to be purchased ${className}`;
    }
  };

  return (
    <div className="check-item">
      <input type="checkbox" onChange={checkHandler} checked={checked} />
      <li
        className={[checkedClassName, groupItemClassName()].join(' ')}
        aria-label={setARIA(groupItemClassName())}
      >
        {name}
      </li>
    </div>
  );
};

export default Item;
