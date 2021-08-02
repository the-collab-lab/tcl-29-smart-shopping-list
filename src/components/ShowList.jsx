import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import Navigation from './Navigation';
import { useHistory } from 'react-router-dom';

function ShowList() {
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [value, loading, error] = useCollection(
    db.collection('items').where('token', '==', token),
  );

  const handleClick = () => {
    history.push('/add-view');
  };

  return (
    <div>
      <h1>ListView</h1>
      {error && <p>Error</p>}
      {loading && <p>Loading..</p>}
      {!loading && value.docs.length === 0 && (
        <div>
          <p>Your shopping list is currently empty</p>
          <button onClick={handleClick}>Add item</button>
        </div>
      )}
      {value && value.docs.length > 0 && (
        <div>
          Collection:
          <ul>
            {value.docs.map((doc) => (
              <li key={doc.id}>{doc.data().name}</li>
            ))}
          </ul>
        </div>
      )}
      <Navigation />
    </div>
  );
}

export default ShowList;
