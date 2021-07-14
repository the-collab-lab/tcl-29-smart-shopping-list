import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/listView.css';

const ListView = () => {
  return (
    <div className="listView">
      <ul>
        <li className="list">
          <Link to="/list-view">List View</Link>
        </li>
        <li>
          <Link to="/add-view">Add View</Link>
        </li>
      </ul>
    </div>
  );
};

export default ListView;
