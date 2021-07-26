import React, { useState } from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';

const Home = () => {
  let history = useHistory();
  const [tokenName, setTokenName] = useState('');

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list-view');
  };

  return (
    <div>
      <h1>Welcome to your Smart Shopping list!</h1>
      <button onClick={generateToken}>Create a new list</button>
      <p> - or - </p>
      <p>Join an existing shopping list by entering a three word token.</p>

      <form>
        <label htmlFor="inputToken">Share token</label>
        <input
          placeholder="three work token"
          id="inputToken"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <button type="submit">Join an existing list</button>
      </form>
    </div>
  );
};

/*  */

export default Home;
