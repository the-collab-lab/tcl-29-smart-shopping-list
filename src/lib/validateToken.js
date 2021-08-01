import db from '../lib/firebase';

export const validateToken = (token) => {
  db.collection('tokens')
    .where('tokenArray', 'array-contains', token)
    .get()
    .then((querySnapshot) => {
      return querySnapshot.empty;
    });
};
