import React from 'react';
import getToken from '../lib/tokens';
import { useHistory } from 'react-router-dom';

const Home = () => {
  let history = useHistory();

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list-view');
  };

  return (
    <div>
      <button onClick={generateToken}>Create a new list</button>
    </div>
  );
};

export default Home;
