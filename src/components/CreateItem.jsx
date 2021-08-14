import React, { useState } from 'react';
import db from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import './createItem.css';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../lib/validateToken';

function CreateItem() {
  const history = useHistory();
  const itemObj = {
    itemName: '',
    nextPurchase: '7',
  };
  const [item, setItem] = useState(itemObj);
  const [notifiction, setNotification] = useState(false);
  const token = localStorage.getItem('token');

  const [value] = useCollection(
    db.collection('items').where('token', '==', token),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanUserInput = (itemName) => {
      return itemName.replace(/[\W_]+/g, '').toLowerCase();
    };

    const findDuplicateItem = (item) => {
      let existingItem = false;

      value.docs.forEach((doc) => {
        const nameFromDb = doc.data().name;
        const nameFromUser = item.itemName;

        if (cleanUserInput(nameFromDb) === cleanUserInput(nameFromUser)) {
          existingItem = true;
        }
      });
      return existingItem;
    };

    let duplicatedItem = findDuplicateItem(item);
    const invalidToken = await validateToken(token);

    if (invalidToken) {
      localStorage.clear();
      history.push('/');
    } else if (duplicatedItem) {
      setNotification(duplicatedItem);
    } else {
      db.collection('items').add({
        name: item.itemName,
        nextPurchase: parseInt(item.nextPurchase),
        numberOfPurchases: 0,
        lastPurchasedDate: null,
        token,
      });
      setItem(itemObj);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>AddView</h1>
      {notifiction && (
        <div className="errorMessage">The Item already exist </div>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="item-name">Item name:</label>
        <input
          type="text"
          id="item-name"
          value={item.itemName}
          name="itemName"
          onChange={handleChange}
        />
        <fieldset className="radio-buttons">
          <legend>How soon will you buy this again?</legend>
          <div>
            <input
              type="radio"
              id="soon"
              value={7}
              name="nextPurchase"
              onChange={handleChange}
              checked={item.nextPurchase === '7'}
            />
            <label htmlFor="soon">Soon</label>
          </div>

          <div>
            <input
              type="radio"
              id="kind-of-soon"
              value={14}
              name="nextPurchase"
              onChange={handleChange}
              checked={item.nextPurchase === '14'}
            />
            <label htmlFor="kind-of-soon">Kind of soon</label>
          </div>

          <div>
            <input
              type="radio"
              id="not-soon"
              value={30}
              name="nextPurchase"
              onChange={handleChange}
              checked={item.nextPurchase === '30'}
            />
            <label htmlFor="not-soon">Not soon</label>
          </div>
        </fieldset>

        <button type="submit" disabled={item.itemName.length === 0}>
          Add item
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
