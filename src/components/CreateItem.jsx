import React, { useState } from 'react';
import db from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import './createItem.css';
import { useHistory } from 'react-router-dom';
import { validateToken } from '../lib/validateToken';
import { Card, Button } from '@material-ui/core';
import TopImage from '../images/milky_top.png';
import logo from '../images/logo.png';
import './Home.css';

const styles = {
  topImage: {
    backgroundImage: `url(${TopImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'header',
    height: '20vh',
    width: '100%',
  },
  btnItemList: {
    backgroundColor: '#668AD4',
    borderRadius: '72px',
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    marginBottom: '24px',
  },
  btnAddSingleItem: {
    backgroundColor: 'white',
    border: 'solid 4px #668AD4',
    borderRadius: '72px',
    color: '#668AD4',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    marginTop: '24px',
  },
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
    <Card style={styles.card}>
      <div style={styles.topImage} />
      <div className="createItem">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">Add a new item</h1>
        {notifiction && (
          <div className="errorMessage">The Item already exists </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-name">
            <label htmlFor="item-name">Name:</label>
            <input
              type="text"
              variant="out-lined"
              id="item-name"
              className="input-box"
              value={item.itemName}
              name="itemName"
              onChange={handleChange}
            />
          </div>
          <fieldset className="radio-buttons">
            <p className="how_soon">How soon will you buy this again?</p>
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

          <Button
            type="submit"
            disabled={item.itemName.length === 0}
            variant="contained"
            style={styles.btnAddSingleItem}
          >
            <i className="fas fa-plus-circle"></i>
            Add item
          </Button>
        </form>
      </div>
    </Card>
  );
}

export default CreateItem;
