import React from 'react';
import db from '../lib/firebase';
import calculateEstimate from '../lib/estimates';

const Item = ({
  displayMessage,
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

  const handleClick = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (!confirmation) {
      return;
    }

    try {
      await db.collection('items').doc(id).delete();
      displayMessage(`${name} successfully deleted!`);
    } catch (error) {
      displayMessage('AN ERROR OCCURRED. Please try again.');
      console.error('Error removing document: ', error);
    }
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
    <li
      className={[checkedClassName, groupItemClassName(), 'check-item'].join(
        ' ',
      )}
      aria-label={setARIA(groupItemClassName())}
    >
      <div>
        <input type="checkbox" onChange={checkHandler} checked={checked} />
        {name}
      </div>

      <div>
        <button className="delete-button" onClick={handleClick}>
          delete
        </button>
      </div>
    </li>
  );
};

export default Item;
