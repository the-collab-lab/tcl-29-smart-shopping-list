import React from 'react';
import CreateItem from './components/CreateItem';
import ShowItemList from './components/ShowItemList';

import './App.css';

function App() {
  return (
    <div className="App">
      <ShowItemList />
      <CreateItem />
    </div>
  );
}

export default App;
