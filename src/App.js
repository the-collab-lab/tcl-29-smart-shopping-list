import React from 'react';
import CreateItem from './components/CreateItem';
import ShowList from './components/ShowList';
import Home from './components/Home';
import Navigation from './components/Navigation';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/list-view">
            <ShowList />
          </Route>
          <Route path="/add-view">
            <CreateItem />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Navigation />
      </Router>
    </div>
  );
};

export default App;
