import React, { useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';
import db from '../lib/firebase';
import firebase from 'firebase/app';

import './Home.css';

const Home = () => {
  let history = useHistory();
  const [tokenName, setTokenName] = useState('');

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);

    db.collection('tokens')
      .doc('tokenDocument')
      .update({
        tokenArray: firebase.firestore.FieldValue.arrayUnion(token),
      });

    history.push('/list-view');
  };

  return (
    <div class="home">
      <h1>Welcome to your Smart Shopping list!</h1>
      <button onClick={generateToken}>Create a new list</button>
      <p> - or - </p>
      <p>Join an existing shopping list by entering a three word token.</p>

      <form>
        <label htmlFor="inputToken" className="shareToken">
          Share token
        </label>
        <input
          className="inputBox"
          placeholder="three work token"
          id="inputToken"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <button type="submit" className="submitButton">
          Join an existing list
        </button>
      </form>
    </div>
  );
};

/*  */

export default Home;
