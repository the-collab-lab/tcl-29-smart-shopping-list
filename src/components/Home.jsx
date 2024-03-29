import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import db from '../lib/firebase';
import { Paper, Button, Card, TextField } from '@material-ui/core';
import Image from '../images/backround.png';
import TopImage from '../images/milky_top.png';
import BottomImage from '../images/milky_bottom.png';
import logo from '../images/logo.png';
import './Home.css';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundColor: '#FFE5E2',
    backgroundSize: '100% 100%',
  },
  topImage: {
    backgroundImage: `url(${TopImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'header',
    height: '20vh',
    width: '100%',
  },
  bottomImage: {
    backgroundImage: `url(${BottomImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'footer',
    height: '10vh',
    width: '100%',
  },
  btnNewList: {
    backgroundColor: '#668AD4',
    borderRadius: '72px',
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    textTransform: 'none',
    marginBottom: '24px',
  },
  btnJoin: {
    backgroundColor: 'white',
    border: 'solid 2px #668AD4',
    borderRadius: '72px',
    color: '#668AD4',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    textTransform: 'none',
    marginTop: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '45px',
    color: '#668AD4',
    display: 'block',
    margin: '0 auto',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    fontWeight: 'bold',
    textTransform: 'none',
    maxWidth: '280px',
    padding: '20px',
    lineHeight: 1.2,
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
    // const token = 'the collab lab';
    // localStorage.setItem('token', token);

    // db.collection('tokens')
    //   .doc('tokenDocument')
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       db.collection('tokens')
    //         .doc('tokenDocument')
    //         .update({
    //           tokenArray: firebase.firestore.FieldValue.arrayUnion(token),
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //           return;
    //         });
    //     } else {
    //       db.collection('tokens')
    //         .doc('tokenDocument')
    //         .set({
    //           tokenArray: [token],
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //           return;
    //         });
    //     }
    //   });

    // history.push('/list-view');
    console.log('Creating new lists is no longer supported');
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

  /** Using this alert instead of the ArchivalNoticeModal due to legacy deps */
  useEffect(() => {
    alert(
      'This Smart Shopping List App was made by early-career developers at The Collab Lab. This project has now been archived. To view the demo shopping list, enter the three word token: the collab lab. The following features are no longer supported: creating new lists, adding & deleting items from the list, and marking items on the list as purchased.',
    );
  }, []);

  return (
    <Paper style={styles.paperContainer}>
      <div style={styles.topImage} />
      <div className="home">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">
          Welcome to <br /> Your Smart Shopping list!
        </h1>
        <Button
          onClick={generateToken}
          variant="contained"
          style={styles.btnNewList}
        >
          <i className="fas fa-plus-circle"></i>
          Create a new list
        </Button>
        <Card style={styles.card}>
          <p> - OR - </p>
          <p>Join an existing shopping list by entering a three word token.</p>

          {notification ? (
            <div className="error-message">{notification}</div>
          ) : null}
          <form onSubmit={compareToken}>
            <TextField
              label="Enter Token"
              variant="outlined"
              className="input-box"
              id="inputToken"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
            <Button
              type="submit"
              className="submit-button"
              disabled={tokenName.length === 0}
              variant="contained"
              style={styles.btnJoin}
            >
              <i className="fas fa-plus-circle"></i>
              Join existing list
            </Button>
          </form>
        </Card>
      </div>
      <div style={styles.bottomImage} className="bottom" />
    </Paper>
  );
};

export default Home;
