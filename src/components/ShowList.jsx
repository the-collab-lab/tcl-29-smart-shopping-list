import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import Item from './Item';
import './ShowList.css';

function ShowList() {
  const [filter, setFilter] = useState('');
  const [actionMessage, setActionMessage] = useState(null);
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

  const displayMessage = (message) => {
    setActionMessage(message);
    setTimeout(() => {
      setActionMessage(null);
    }, 8000);
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
          {actionMessage ? (
            <p className="success-message">{actionMessage}</p>
          ) : null}
          <ul>
            {filter
              ? value.docs
                  .filter((item) =>
                    item
                      .data()
                      .name.toLowerCase()
                      .includes(filter.toLowerCase()),
                  )
                  .map((item) => (
                    <Item
                      key={item.id}
                      setActionMessage={setActionMessage}
                      id={item.id}
                      {...item.data()}
                    />
                  ))
              : value.docs.map((doc) => (
                  <Item
                    key={doc.id}
                    displayMessage={displayMessage}
                    {...doc.data()}
                    id={doc.id}
                  />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowList;
