import React from 'react';
import { Card, Button } from '@material-ui/core';
import TopImage from '../images/milky_top.png';
import './ShareList.css';
import logo from '../images/logo.png';

const styles = {
  paperContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: '20px',
    height: '100%',
    width: '75%',
    margin: '80px auto 0 auto',
  },
  topImage: {
    backgroundImage: `url(${TopImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'header',
    height: '20vh',
    width: '100%',
  },
  btnShare: {
    backgroundColor: 'white',
    border: 'solid 4px #6C92E0',
    borderRadius: '72px',
    color: '#6C92E0',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    marginTop: '24px',
  },
  threeWordToken: {
    backgroundColor: 'none',
    border: 'solid 2px #E93B81',
    borderRadius: '24px',
    padding: '10px',
    color: '#E93B81',
  },
};

const ShareView = () => {
  const userToken = localStorage.getItem('token');

  const handleClick = () => {
    navigator.clipboard.writeText(userToken);
  };

  return (
    <Card style={styles.paperContainer}>
      <div style={styles.topImage}>
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="share-view">
        <h1>Share Shopping List</h1>
        <p>Copy the token below and share it with your shopping Buddies</p>
        <Card style={styles.threeWordToken} className="three-word-token">
          {userToken}
        </Card>
        <Button
          onClick={handleClick}
          variant="contained"
          style={styles.btnShare}
        >
          Copy
        </Button>
      </div>
    </Card>
  );
};

export default ShareView;
