import React, { useState } from 'react';
import db from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import './createItem.css';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../lib/validateToken';
import { Paper, Button, Card, TextField } from '@material-ui/core';
import Image from '../images/backround.png';
import TopImage from '../images/milky_top.png';
import BottomImage from '../images/milky_bottom.png';
import logo from '../images/logo.png';
import './Home.css';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundColor: '#FFE5E2',
    backgroundSize: '100% 100%',
  },
  topImage: {
    backgroundImage: `url(${TopImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'header',
    height: '20vh',
    width: '100%',
  },
  bottomImage: {
    backgroundImage: `url(${BottomImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'footer',
    height: '10vh',
    width: '100%',
  },
  btnItemList: {
    backgroundColor: '#6C92E0',
    borderRadius: '72px',
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    marginBottom: '24px',
  },
  btnAddSingleItem: {
    backgroundColor: 'white',
    border: 'solid 2px #6C92E0',
    borderRadius: '72px',
    color: '#6C92E0',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    marginTop: '24px',
  },
  // card: {
  //   backgroundColor: 'white',
  //   borderRadius: '45px',
  //   color: 'black',
  //   display: 'block',
  //   margin: '0 auto',
  //   fontSize: '18px',
  //   fontFamily: 'Jaldi, sans-serif',
  //   maxWidth: '280px',
  //   padding: '20px',
  //   lineHeight: 1.2,

  // },

  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: '20px',
    height: '100%',
    width: '75%',
    margin: '80px auto 0  auto',
  },
};

function CreateItem() {
  const history = useHistory();
  const itemObj = {
    itemName: '',
    nextPurchase: '7',
  };
  const [item, setItem] = useState(itemObj);
  const [notifiction, setNotification] = useState(false);
  const token = localStorage.getItem('token');

  const [value] = useCollection(
    db.collection('items').where('token', '==', token),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanUserInput = (itemName) => {
      return itemName.replace(/[\W_]+/g, '').toLowerCase();
    };

    const findDuplicateItem = (item) => {
      let existingItem = false;

      value.docs.forEach((doc) => {
        const nameFromDb = doc.data().name;
        const nameFromUser = item.itemName;

        if (cleanUserInput(nameFromDb) === cleanUserInput(nameFromUser)) {
          existingItem = true;
        }
      });
      return existingItem;
    };

    let duplicatedItem = findDuplicateItem(item);
    const invalidToken = await validateToken(token);

    if (invalidToken) {
      localStorage.clear();
      history.push('/');
    } else if (duplicatedItem) {
      setNotification(duplicatedItem);
    } else {
      db.collection('items').add({
        name: item.itemName,
        nextPurchase: parseInt(item.nextPurchase),
        numberOfPurchases: 0,
        lastPurchasedDate: null,
        token,
      });
      setItem(itemObj);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  return (
    <Paper style={styles.paperContainer}>
      <Card style={styles.card}>
        <div style={styles.topImage} />
        <div className="createItem">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="title">Add a new item</h1>
          {notifiction && (
            <div className="errorMessage">The Item already exists </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="item-name">Item name:</label>
            {/* <input
              type="text"
              variant="out-lined"
              id="item-name"
              className="input-box"
              value={item.itemName}
              name="itemName"
              onChange={handleChange}
            /> */}
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={item.itemName}
              onChange={handleChange}
            />
            <fieldset className="radio-buttons">
              <legend>How soon will you buy this again?</legend>
              <div className="radio-btn-nextpurchase">
                <input
                  type="radio"
                  id="soon"
                  value={7}
                  name="nextPurchase"
                  onChange={handleChange}
                  checked={item.nextPurchase === '7'}
                />
                <label htmlFor="soon">Soon</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="kind-of-soon"
                  value={14}
                  name="nextPurchase"
                  onChange={handleChange}
                  checked={item.nextPurchase === '14'}
                />
                <label htmlFor="kind-of-soon">Kind of soon</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="not-soon"
                  value={30}
                  name="nextPurchase"
                  onChange={handleChange}
                  checked={item.nextPurchase === '30'}
                />
                <label htmlFor="not-soon">Not soon</label>
              </div>
            </fieldset>

            <button
              type="submit"
              disabled={item.itemName.length === 0}
              style={styles.btnAddSingleItem}
            >
              <i className="fas fa-plus-circle"></i>
              Add item
            </button>
          </form>
        </div>
        <div style={styles.bottomImage} className="bottom" />
      </Card>
    </Paper>
  );
}

export default CreateItem;
