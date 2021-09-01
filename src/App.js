import React from 'react';
import CreateItem from './components/CreateItem';
import ShowList from './components/ShowList';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { Paper } from '@material-ui/core';
import Image from './images/backround.png';
import './App.css';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundColor: '#FFE5E2',
    backgroundSize: '100% 100%',
  },
};
const App = () => {
  const existingToken = localStorage.getItem('token');

  return (
    <Paper style={styles.paperContainer}>
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
          </Switch>
          {existingToken ? <Redirect to="/list-view" /> : <Redirect to="/" />}
        </Router>
      </div>
    </Paper>
  );
};

export default App;
