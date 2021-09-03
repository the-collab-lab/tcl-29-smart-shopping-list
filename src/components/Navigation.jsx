import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Button
            component={NavLink}
            to="/list-view"
            activeClassName="active"
            aria-label="my list"
          >
            <i className="far fa-file-alt"></i>
            <span className="text">My List</span>
          </Button>
        </li>
        <li>
          <Button
            component={NavLink}
            to="/add-view"
            activeClassName="active"
            aria-label="add item"
          >
            <i className="fas fa-plus-circle"></i>
            <span className="text">Add Item</span>
          </Button>
        </li>
        <li>
          <Button
            component={NavLink}
            to="/list-view"
            activeClassName="active"
            aria-label="share list"
          >
            <i className="fas fa-paper-plane"></i>
            <span className="text">Share List</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
