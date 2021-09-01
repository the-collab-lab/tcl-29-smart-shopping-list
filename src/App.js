import React from 'react';
import CreateItem from './components/CreateItem';
import ShowList from './components/ShowList';
import Home from './components/Home';
import Navigation from './components/Navigation';
import ShareList from './components/ShareList';
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
            <Navigation />
          </Route>
          <Route path="/add-view">
            <CreateItem />
            <Navigation />
          </Route>
          <Route path="/share-view">
            <ShareList />
            <Navigation />
          </Route>
        </Switch>
        {existingToken ? <Redirect to="/list-view" /> : <Redirect to="/" />}
      </Router>
    </div>
  );
};

export default App;
