import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import Item from './Item';
import './ShowList.css';

function ShowList() {
  const [filter, setFilter] = useState('');
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [value, loading, error] = useCollection(
    db.collection('items').where('token', '==', token),
  );

  const handleClick = () => {
    history.push('/add-view');
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const isInactiveItem = (item) => {
    const now = new Date().getTime() / 1000;
    const oneDayInSeconds = 60 * 60 * 24;
    let elapsedTime =
      item.lastPurchasedDate != null
        ? (now - item.lastPurchasedDate.seconds) / oneDayInSeconds
        : item.nextPurchase;
    if (item.nextPurchase * 2 <= elapsedTime) {
      return true;
    }
    return false;
  };

  const sortItems = (item1, item2) => {
    if (!isInactiveItem(item1.data()) && isInactiveItem(item2.data())) {
      return -1;
    } else if (isInactiveItem(item1.data()) && !isInactiveItem(item2.data())) {
      return 1;
    }

    if (item1.data().nextPurchase === item2.data().nextPurchase) {
      return item1.data().name.localeCompare(item2.data().name);
    }
    return item1.data().nextPurchase - item2.data().nextPurchase;
  };

  return (
    <div className="list-view">
      <h1>Smart Shopping List</h1>
      {error && <p>Error</p>}
      {loading ? (
        <p>Loading..</p>
      ) : (
        value.docs.length === 0 && (
          <div>
            <p>Your shopping list is currently empty</p>
            <button onClick={handleClick}>Add item</button>
          </div>
        )
      )}
      {value && value.docs.length > 0 && (
        <div>
          <input
            type="text"
            placeholder="Filter items..."
            value={filter}
            onChange={handleChange}
          />
          {filter && (
            <button
              onClick={() => setFilter('')}
              aria-label="clear filter text"
              className="clear-button"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
          <ul>
            {filter
              ? value.docs
                  .filter((item) =>
                    item
                      .data()
                      .name.toLowerCase()
                      .includes(filter.toLowerCase()),
                  )
                  .sort(sortItems)
                  .map((item) => (
                    <Item
                      key={item.id}
                      id={item.id}
                      lastPurchasedDate={item.data().lastPurchasedDate}
                      name={item.data().name}
                    />
                  ))
              : value.docs
                  .sort(sortItems)
                  .map((doc) => (
                    <Item key={doc.id} {...doc.data()} id={doc.id} />
                  ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowList;
