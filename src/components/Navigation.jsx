import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/list-view" activeClassName="active">
            List
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-view" activeClassName="active">
            Add Item
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
