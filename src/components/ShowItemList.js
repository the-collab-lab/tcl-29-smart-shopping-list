import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import '../lib/firebase';

function ShowItemList() {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('items'),
  );

  return (
    <div>
      {error && <p>Error</p>}
      {loading && <p>Loading..</p>}
      {value && (
        <span>
          Collection:
          <ul>
            {value.docs.map((doc) => (
              <li key={doc.id}>{JSON.stringify(doc.data())}</li>
            ))}
          </ul>
        </span>
      )}
    </div>
  );
}

export default ShowItemList;
