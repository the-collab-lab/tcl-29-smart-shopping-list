import React from 'react';
import firebase from 'firebase/app';

function CreateItem() {
  const handleClick = async () => {
    await firebase.firestore().collection('items').add({
      name: 'A test product',
      date: Date().toLocaleString(),
    });
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Create item</button>
    </div>
  );
}

export default CreateItem;
