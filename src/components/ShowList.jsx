import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import Navigation from './Navigation';
import Item from './Item';
import './ShowList.css';

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
              <Item key={doc.id} {...doc.data()} id={doc.id} />
            ))}
          </ul>
        </div>
      )}

      <Navigation />
    </div>
  );
}

export default ShowList;
