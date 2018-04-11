import React from 'react';
import EachItem from './EachItem';

export const ItemList = ({
  items,
  addItemsToBox,
  isDropped,
  draggable,
  updateErrorMessage,
  isOver,
  updateIsOver
}) => (
  <ul
    style={{
      listStyleType: 'none',
      padding: '0',
      margin: '20px',
      width: '300px'
    }}
  >
    {items.map((item, index) => (
      <EachItem
        key={index}
        item={item}
        isDropped={isDropped}
        draggable={draggable}
        addItemsToBox={addItemsToBox}
        updateErrorMessage={updateErrorMessage}
        isOver={isOver}
        updateIsOver={updateIsOver}
      />
    ))}
  </ul>
);
