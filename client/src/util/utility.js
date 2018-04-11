import uuidv4 from 'uuid/v4';
const Chance = require('chance');
const chance = new Chance();

export const createUser = () => ({
  name: chance.name(),
  id: uuidv4()
});

export const addBoxIdtoItem = (itemId, boxId) => {
  return fetch(`/items/${itemId}`, {
    body: JSON.stringify({ boxId }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  })
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
};

export const addItemOrBox = (ItemName = null, BoxName = null, weight) => {
  const newID = uuidv4();
  let URL = '';
  if (ItemName && !BoxName) {
    URL = `/items/${newID}`;
  } else if (!ItemName && BoxName) {
    URL = `/boxes/${newID}`;
  }
  return fetch(URL, {
    body: JSON.stringify({
      name: ItemName ? ItemName : BoxName,
      weight
    }),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
    .then(res => res.json())
    .then(data => data, error => console.log(error));
};

export const addWeightOfItemsInBox = items => {
  const weightArr = items.map(item => item.weight);
  return weightArr.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
};

export const letDrop = (itemsWeight, itemWeight, allowedWeight) => {
  if (itemsWeight + itemWeight > allowedWeight) {
    return false;
  } else {
    return true;
  }
};
