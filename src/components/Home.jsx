import React from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';

const Home = () => {
  let history = useHistory();

  const Token = function generateToken() {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list-view');

    console.log(token);
  };

  function fetchToken() {
    localStorage.getItem('token');
    history.push('/list-view');
  }

  return (
    <div>
      <button onClick={Token}>Create a new list</button>

      <input
        placeholder="three work token"
        for="inputToken"
        onChange={fetchToken}
      ></input>
    </div>
  );
};

export default Home;
