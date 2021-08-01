import React, { useEffect, useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import db from '../lib/firebase';
import firebase from 'firebase/app';

import './Home.css';

const Home = () => {
  let history = useHistory();
  const [tokenName, setTokenName] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  let timerId;

  const resetError = () => {
    timerId = setTimeout(() => {
      setNotification(null);
      setError(false);
    }, 10000);
  };

  useEffect(() => {
    if (error) resetError();
    return () => {
      clearTimeout(timerId);
    };
  }, [error]); // eslint-disable-line

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);

    db.collection('tokens')
      .doc('tokenDocument')
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection('tokens')
            .doc('tokenDocument')
            .update({
              tokenArray: firebase.firestore.FieldValue.arrayUnion(token),
            })
            .catch((error) => {
              console.log(error);
              return;
            });
        } else {
          db.collection('tokens')
            .doc('tokenDocument')
            .set({
              tokenArray: [token],
            })
            .catch((error) => {
              console.log(error);
              return;
            });
        }
      });

    history.push('/list-view');
  };

  const compareToken = (e) => {
    e.preventDefault();

    db.collection('tokens')
      .where('tokenArray', 'array-contains', tokenName)
      .get()
      .then((querySnapshot) => {
        let tokenInDB;
        querySnapshot.forEach((doc) => {
          tokenInDB = doc.exists;
        });
        if (tokenInDB) {
          localStorage.setItem('token', tokenName);
          history.push('/list-view');
        } else {
          setError(true);
          setNotification(
            'Token not found - please check spelling and try again or create new list',
          );
        }
      })
      .catch((error) => {
        setError(true);
        setNotification(
          'An unexpected error occurred, please refresh the page and try again',
        );
      });
  };

  return (
    <div className="home">
      <h1>Welcome to your Smart Shopping list!</h1>
      <button onClick={generateToken}>Create a new list</button>
      <p> - or - </p>
      <p>Join an existing shopping list by entering a three word token.</p>

      {notification ? (
        <div className="error-message">{notification}</div>
      ) : null}

      <form onSubmit={compareToken}>
        <label htmlFor="inputToken" className="share-token">
          Share token
        </label>
        <input
          className="input-box"
          placeholder="three word token"
          id="inputToken"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <button type="submit" className="submit-button">
          Join an existing list
        </button>
      </form>
    </div>
  );
};

export default Home;
