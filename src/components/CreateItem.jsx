import React from 'react';
import db from '../lib/firebase';
import './createItem.css';

function CreateItem() {
  const handleSubmit = async () => {
    console.log('submitted');
  };

  // const handleClick = async () => {
  //   await db.collection('items').add({
  //     name: 'A test product',
  //     date: Date().toLocaleString(),
  //   });
  // };

  return (
    <div>
      <h1>AddView</h1>

      <form onSubmit={() => handleSubmit()}>
        <label HTMLfor="item-name">Item name:</label>
        <input type="text" id="item-name" value="" />
        <fieldset className="radio-buttons">
          <legend>How soon will you buy this again?</legend>
          <div>
            <input type="radio" id="soon" value={7} name="frequency" checked />
            <label HTMLfor="soon">Soon</label>
          </div>

          <div>
            <input type="radio" id="kind-of-soon" value={14} name="frequency" />
            <label HTMLfor="kind-of-soon">Kind of soon</label>
          </div>

          <div>
            <input type="radio" id="not-soon" value={30} name="frequency" />
            <label HTMLfor="not-soon">Not soon</label>
          </div>
        </fieldset>

        <button type="submit">Add item</button>
      </form>
    </div>
  );
}

export default CreateItem;
