import React from 'react';
import getToken from '../lib/tokens';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Home = () => {
  // const [hasToken, setHasToken] = useState(false);

  let history = useHistory();

  const Token = function generateToken() {
    const token = getToken();
    localStorage.setItem('token', token);
    history.push('/list-view');

    console.log(token);
  };

  // function fetchToken() {
  //   localStorage.getItem('token');
  //   history.push('/list-view');
  // }

  const existingToken = localStorage.getItem('token');

  return (
    <div>
      <button onClick={Token}>Create a new list</button>
      {existingToken ? <Redirect from="/" to="/list-view" /> : ''}
      {
        {
          /* <input> below will be used at a later date  */
        }
        /* <input
        placeholder="three work token"
        for="inputToken"
        onChange={fetchToken}
      ></input> */
      }
    </div>
  );
};

export default Home;
