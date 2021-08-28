import React, { useEffect, useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import db from '../lib/firebase';
import firebase from 'firebase/app';
import { Paper } from '@material-ui/core';
// import { Container } from '@material-ui/core';
import Image from '../images/backround.png';
import TopImage from '../images/Milky.png';
import './Home.css';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: '100%',
    backgroundColor: '#FFE5E2',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  },
  topImage: {
    backgroundImage: `url(${TopImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '50%',
    width: '100%',
  },
};

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
        if (!querySnapshot.empty) {
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
    <Paper style={styles.paperContainer}>
      <div style={styles.topImage} />
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
          <button
            type="submit"
            className="submit-button"
            disabled={tokenName.length === 0}
          >
            Join an existing list
          </button>
        </form>
      </div>
    </Paper>
  );
};

export default Home;
