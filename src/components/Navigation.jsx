import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
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
  );
};

export default Navigation;
