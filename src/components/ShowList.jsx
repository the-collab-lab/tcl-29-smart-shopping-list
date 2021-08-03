import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import Navigation from './Navigation';
import './ShowList.css';

function ShowList() {
  const [isChecked, setCheck] = useState(false);
  const token = localStorage.getItem('token');
  const [value, loading, error] = useCollection(
    db.collection('items').where('token', '==', token),
  );

  const checkHandler = (e) => {
    const itemId = e.target.id;
    // apply the logic of apdating lastPurchasedItem
    db.collection('items')
      .doc(itemId)
      .update({ lastPurchasedDate: new Date() });

    setCheck(true);
  };

  return (
    <div>
      <h1>ListView</h1>
      {error && <p>Error</p>}
      {loading && <p>Loading..</p>}
      {value && (
        <div>
          Collection:
          <ul>
            {value.docs.map((doc) => (
              <div className="check-item">
                <input
                  id={doc.id}
                  type="checkbox"
                  onChange={checkHandler}
                  // checked
                />
                <li key={doc.id}>{doc.data().name}</li>
              </div>
            ))}
          </ul>
        </div>
      )}

      <Navigation />
    </div>
  );
}

export default ShowList;
