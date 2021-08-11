import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import Item from './Item';
import './ShowList.css';
import { doc } from 'prettier';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

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
            <button onClick={() => setFilter('')}>
              <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
          )}
          <ul>
            {filter
              ? value.docs
                  .map((doc) => ({ id: doc.id, ...doc.data() }))
                  .filter((item) =>
                    item.name.toLowerCase().includes(filter.toLowerCase()),
                  )
                  .map((item) => (
                    <Item
                      key={item.id}
                      id={doc.id}
                      lastPurchasedDate={item.lastPurchasedDate}
                      name={item.name}
                    />
                  ))
              : value.docs.map((doc) => (
                  <Item key={doc.id} {...doc.data()} id={doc.id} />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowList;

/**
 * filter &&()
 */
