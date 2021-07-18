import React from 'react';
import CreateItem from './components/CreateItem';
import ShowList from './components/ShowList';
import './App.css';
import ListView from './components/ListView';
import AddView from './components/AddView';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <NavLink to="/list-view" activeStyle={{ fontWeight: 'bold' }}>
                ListView
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-view" activeStyle={{ fontWeight: 'bold' }}>
                AddView
              </NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route path="/list-view">
            <ListView />
          </Route>
          <Route path="/add-view">
            <AddView />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <ShowList />
      <CreateItem />
    </div>
  );
};

export default App;
