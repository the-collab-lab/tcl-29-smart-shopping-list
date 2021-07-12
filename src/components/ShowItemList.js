import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import '../lib/firebase';
//const db = fb.firestore()

function ShowItemList() {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('items'),
  );

  return (
    <div>
      {error && <p>"Error"</p>}
      {loading && <p>"Loading.."</p>}
      {value && <p>"value"</p>}
    </div>
  );
}

export default ShowItemList;
