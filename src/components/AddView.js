import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/addView.css';

const AddView = () => {
  return (
    <div className="addview">
      <ul>
        <li>
          <Link to="/list-view">List View</Link>
        </li>
        <li className="add">
          <Link to="/add-view">Add View</Link>
        </li>
      </ul>
    </div>
  );
};

export default AddView;
