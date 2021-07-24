import React from 'react';
import CreateItem from './components/CreateItem';
import ShowList from './components/ShowList';
import Home from './components/Home';

import './App.css';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const App = () => {
  const existingToken = localStorage.getItem('token');

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/list-view">
            <ShowList />
          </Route>
          <Route path="/add-view">
            <CreateItem />
          </Route>
        </Switch>
        {existingToken ? <Redirect to="/list-view" /> : <Redirect to="/" />}
      </Router>
    </div>
  );
};

export default App;
