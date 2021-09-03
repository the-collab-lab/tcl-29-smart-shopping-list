import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Button component={NavLink} to="/list-view" activeClassName="active">
            <i className="far fa-file-alt"></i>
            My List
          </Button>
          {/* <NavLink to="/list-view" activeClassName="active">
            List
          </NavLink> */}
        </li>
        <li>
          <Button component={NavLink} to="/add-view" activeClassName="active">
            <i className="fas fa-plus-circle"></i>
            Add Item
          </Button>
          {/* <NavLink to="/add-view" activeClassName="active">
            Add Item
          </NavLink> */}
        </li>
        <li>
          <Button component={NavLink} to="/list-view" activeClassName="active">
            <i className="fas fa-paper-plane"></i>
            Share List
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
