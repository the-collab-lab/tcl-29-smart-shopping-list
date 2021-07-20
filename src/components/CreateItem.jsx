import React, { useState } from 'react';
import db from '../lib/firebase';
import './createItem.css';

function CreateItem() {
  const itemObj = {
    itemName: '',
    frequency: 7,
  };
  const [item, setItem] = useState(itemObj);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // localStorage.setItem('token', 'a tester token');
    const token = localStorage.getItem('token');
    console.log(token);
    await db.collection('items').add({
      name: item.itemName,
      frequency: item.frequency,
      lastPurchaseDate: null,
      date: Date().toLocaleString(),
    });
    setItem(itemObj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });

    console.log(item);
  };

  // constg handleClick = async () => {
  //   await db.collection('items').add({
  //     name: 'A test product',
  //     date: Date().toLocaleString(),
  //   });
  // };

  return (
    <div>
      <h1>AddView</h1>

      <form onSubmit={handleSubmit}>
        <label HTMLfor="item-name">Item name:</label>
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
              name="frequency"
              onChange={handleChange}
              checked={item.frequency === '7'}
            />
            <label HTMLfor="soon">Soon</label>
          </div>

          <div>
            <input
              type="radio"
              id="kind-of-soon"
              value={14}
              name="frequency"
              onChange={handleChange}
              checked={item.frequency === '14'}
            />
            <label HTMLfor="kind-of-soon">Kind of soon</label>
          </div>

          <div>
            <input
              type="radio"
              id="not-soon"
              value={30}
              name="frequency"
              onChange={handleChange}
              checked={item.frequency === '30'}
            />
            <label HTMLfor="not-soon">Not soon</label>
          </div>
        </fieldset>

        <button type="submit">Add item</button>
      </form>
    </div>
  );
}

export default CreateItem;
