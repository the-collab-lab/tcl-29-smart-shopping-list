import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db from '../lib/firebase';
import { useHistory } from 'react-router-dom';
import { Button, Card } from '@material-ui/core';
import TopImage from '../images/milky_top.png';
import EmptyListImg from '../images/empty_list.png';
import Item from './Item';
import './ShowList.css';

const styles = {
  paperContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: '20px',
    width: '55%',
    display: 'block',
    margin: '120px auto 0  auto',
  },
  topImage: {
    backgroundImage: `url(${TopImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'header',
    height: '20vh',
    width: '100%',
  },
  emptyListImg: {
    backgroundImage: `url(${EmptyListImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: 'footer',
    height: '180px',
    maxWidth: '200px',
    textAlign: 'center',
    margin: '0 auto',
    display: 'block',
    marginBottom: '28px',
  },
  btnNewList: {
    backgroundColor: '#6C92E0',
    borderRadius: '72px',
    color: 'white',
    fontSize: '24px',
    fontFamily: 'Jaldi, sans-serif',
    marginBottom: '24px',
  },
};
function ShowList() {
  const [filter, setFilter] = useState('');
  const [actionMessage, setActionMessage] = useState(null);
  const token = localStorage.getItem('token');
  const history = useHistory();
  const [value, loading, error] = useCollection(
    db.collection('items').where('token', '==', token),
  );

  const handleClick = () => {
    history.push('/add-view');
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const isInactiveItem = (item) => {
    const now = new Date().getTime() / 1000;
    const oneDayInSeconds = 60 * 60 * 24;
    let elapsedTime =
      item.lastPurchasedDate != null
        ? (now - item.lastPurchasedDate.seconds) / oneDayInSeconds
        : item.nextPurchase;
    if (item.nextPurchase * 2 <= elapsedTime) {
      return true;
    }
    return false;
  };

  const sortItems = (item1, item2) => {
    if (!isInactiveItem(item1.data()) && isInactiveItem(item2.data())) {
      return -1;
    } else if (isInactiveItem(item1.data()) && !isInactiveItem(item2.data())) {
      return 1;
    }

    if (item1.data().nextPurchase === item2.data().nextPurchase) {
      return item1.data().name.localeCompare(item2.data().name);
    }
    return item1.data().nextPurchase - item2.data().nextPurchase;
  };

  const displayMessage = (message) => {
    setActionMessage(message);
    setTimeout(() => {
      setActionMessage(null);
    }, 8000);
  };

  return (
    <Card style={styles.paperContainer}>
      <div style={styles.topImage} />
      <div className="list-view">
        <h1 className="shopingList">MY SHOPPING LIST</h1>
        {error && <p>Error</p>}
        {loading ? (
          <p>Loading..</p>
        ) : (
          value.docs.length === 0 && (
            <div>
              <p>
                Your shopping list is currently empty <br /> Add your first item
                now
              </p>
              {/* <button onClick={handleClick}>Add item</button> */}
              <Button
                onClick={handleClick}
                variant="contained"
                style={styles.btnNewList}
                aria-label="Add new items"
              >
                <i className="fas fa-plus-circle"></i>
              </Button>
              <div style={styles.emptyListImg} />
            </div>
          )
        )}
        {value && value.docs.length > 0 && (
          <div>
            <input
              type="text"
              placeholder="Filter items..."
              value={filter}
              onChange={handleChange}
            />
            {filter && (
              <button
                onClick={() => setFilter('')}
                aria-label="clear filter text"
                className="clear-button"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
            {actionMessage ? (
              <p className="success-message">{actionMessage}</p>
            ) : null}
            <ul>
              {filter
                ? value.docs
                    .filter((item) =>
                      item
                        .data()
                        .name.toLowerCase()
                        .includes(filter.toLowerCase()),
                    )
                    .sort(sortItems)
                    .map((item) => (
                      <Item
                        key={item.id}
                        displayMessage={displayMessage}
                        {...item.data()}
                        id={item.id}
                        // lastPurchasedDate={item.data().lastPurchasedDate}
                        // name={item.data().name}
                      />
                    ))
                : value.docs
                    .sort(sortItems)
                    .map((doc) => (
                      <Item
                        key={doc.id}
                        displayMessage={displayMessage}
                        {...doc.data()}
                        id={doc.id}
                      />
                    ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ShowList;
