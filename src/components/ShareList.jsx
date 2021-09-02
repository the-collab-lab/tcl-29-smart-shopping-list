import React from 'react';
import { Card, Button } from '@material-ui/core';
import TopImage from '../images/milky_top.png';
import './ShareList.css';

const styles = {
  paperContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: '20px',
    position: 'absolute',
    top: '15%',
    left: '21%',
    width: '55%',
    height: '70%',
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
};

const ShareView = () => {
  const userToken = localStorage.getItem('token');

  const handleClick = () => {
    navigator.clipboard.writeText(userToken);
  };

  return (
    <Card style={styles.paperContainer}>
      <div style={styles.topImage}>
        <div className="share-view">
          <h1>Share Shopping List</h1>
          <p>Copy the token below and share it with your shopping Buddies</p>
          <div className="three-word-token">{userToken}</div>
          <Button
            onClick={handleClick}
            variant="contained"
            style={styles.btnShare}
          >
            Copy
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShareView;
