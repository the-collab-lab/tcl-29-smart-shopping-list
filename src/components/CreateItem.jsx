import React from 'react';
import db from '../lib/firebase';

function CreateItem() {
  const handleClick = async () => {
    await db.collection('items').add({
      name: 'A test product',
      date: Date().toLocaleString(),
    });
  };

  return (
    <div>
      <h1>AddView</h1>
      <button onClick={() => handleClick()}>Create item</button>
    </div>
  );
}

export default CreateItem;
