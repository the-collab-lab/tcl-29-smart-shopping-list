import React from 'react';
import CreateItem from './components/CreateItem';
import ShowList from './components/ShowList';

import './App.css';

function App() {
  return (
    <div className="App">
      <ShowList />
      <CreateItem />
    </div>
  );
}

export default App;
