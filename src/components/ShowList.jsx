import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';

function ShowList() {
  const [value, loading, error] = useCollection(
    db.collection('items').orderBy('date'),
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
              <li key={doc.id}>{JSON.stringify(doc.data())}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ShowList;
