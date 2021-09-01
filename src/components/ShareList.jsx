import React from 'react';
import './ShareList.css';

const ShareView = () => {
  const userToken = localStorage.getItem('token');

  const handleClick = () => {
    navigator.clipboard.writeText(userToken);
  };

  return (
    <div className="share-view">
      <h1>Share Shopping List</h1>
      <p>Copy the token below and share it with your shopping Buddies</p>
      <div className="three-word-token">{userToken}</div>
      <button onClick={handleClick}>Copy</button>
    </div>
  );
};

export default ShareView;
