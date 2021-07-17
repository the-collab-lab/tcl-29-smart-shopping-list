import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home">
      <ul>
        <li>
          <Link to="/list-view">List View</Link>
        </li>
        <li>
          <Link to="/add-view">Add View</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
