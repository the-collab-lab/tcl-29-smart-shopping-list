import db from '../lib/firebase';

export const validateToken = async (token) => {
  const querySnapshot = await db
    .collection('tokens')
    .where('tokenArray', 'array-contains', token)
    .get();

  return querySnapshot.empty;
};
