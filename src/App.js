import React from 'react';
import './App.css';
import ListView from './components/ListView';
import AddView from './components/AddView';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// https://www.newline.co/@andreeamaco/how-to-handle-navigation-in-your-app-with-react-router-link--088f82d3

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/list-view">
          <ListView />
        </Route>
        <Route exact path="/add-view">
          <AddView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
