import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import Navigation from './Navigation';

function ShowList() {
  const token = localStorage.getItem('token');
  const [value, loading, error] = useCollection(
    db.collection('items').where('token', '==', token),
  );

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
