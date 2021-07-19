import React from 'react';
import getToken from '../lib/tokens';

const Home = () => {
  const Token = function generateToken() {
    const token = getToken();
    localStorage.setItem('token', token);
  };

  /*   function fetchToken() {
    localStorage.getItem('token');
  } */

  return (
    <div>
      <button onClick={Token}>Create a new list</button>
    </div>
  );
};

export default Home;
