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

  const inactiveItem = (item) => {
    const now = Date.now / 1000;
    let elapsedTime =
      item.lastPurchasedDate != null ? now - item.lastPurchasedDate.seconds : 0;
    if (item.numberOfPurchase < 2 || item.nextPurchase * 2 <= elapsedTime) {
      return true;
    }
    return false;
  };

  const sortItems = (doc1, doc2) => {
    if (!inactiveItem(doc1.data()) && inactiveItem(doc2.data())) {
      return -1;
    } else if (inactiveItem(doc1.data()) && !inactiveItem(doc2.data())) {
      return 1;
    }
    if (doc1.data().nextPurchase === doc2.data().nextPurchase) {
      return doc1.data().name.localeCompare(doc2.data().name);
    }
    return doc1.data().nextPurchase - doc2.data().nextPurchase;
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
