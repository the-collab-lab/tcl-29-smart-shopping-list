import React from 'react';
import './App.css';
import ListView from './components/ListView';
import AddView from './components/AddView';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/list-view">
          <ListView />
        </Route>
        <Route path="/add-view">
          <AddView />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
