import React from 'react';
import db from '../lib/firebase';
import calculateEstimate from '../lib/estimates';

const Item = ({
  setActionMessage,
  name,
  id,
  nextPurchase,
  lastPurchasedDate,
  numberOfPurchases,
}) => {
  console.log(setActionMessage);

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
    let currentDate = new Date().getTime();
    let latestInterval =
      lastPurchasedDate != null
        ? Math.round(
            // convert from date to seconds
            (currentDate / 1000 - lastPurchasedDate.seconds) /
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

  function handleClick(e) {
    e.preventDefault();
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (confirmation) {
      db.collection('items')
        .doc(id)
        .delete()
        .then(() => {
          setActionMessage(`${name} successfully deleted!`);
          setTimeout(() => {
            setActionMessage(null);
          }, 10000);
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    }
  }

  const checked = checkDate(lastPurchasedDate);
  const className = checked ? 'checked' : '';
  return (
    <li className={`${className} check-item`}>
      <div>
        <input type="checkbox" onChange={checkHandler} checked={checked} />
        {name}
      </div>

      <div>
        <a className="delete-button" href="x" onClick={handleClick}>
          delete
        </a>
      </div>
    </li>
  );
};

export default Item;
