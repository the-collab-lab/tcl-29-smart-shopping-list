import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/list-view" activeClassName="active">
            ListView
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-view" activeClassName="active">
            AddView
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
