import React from 'react';
import getToken from '../lib/tokens';
import { Redirect, useHistory } from 'react-router-dom';

const Home = () => {
  // const [hasToken, setHasToken] = useState(false);

  let history = useHistory();

  const Token = function generateToken() {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list-view');

    console.log(token);
  };

  const existingToken = localStorage.getItem('token');

  return (
    <div>
      <button onClick={Token}>Create a new list</button>
      {existingToken ? <Redirect from="/" to="/list-view" /> : ''}
    </div>
  );
};

export default Home;
