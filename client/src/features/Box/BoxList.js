import React, { Component } from 'react';
import EachBox from './EachBox';

class BoxList extends Component {
  render() {
    const {
      boxes,
      removeItemsFromBox,
      isPopped,
      updateCanDrop,
      updateIsOver
    } = this.props;
    return (
      <ul
        style={{
          listStyleType: 'none',
          padding: 'none',
          margin: '20px',
          width: '300px'
        }}
      >
        {boxes.map((box, index) => (
          <EachBox
            key={index}
            box={box}
            removeItemsFromBox={removeItemsFromBox}
            isPopped={isPopped}
            updateCanDrop={updateCanDrop}
            updateIsOver={updateIsOver}
          />
        ))}
      </ul>
    );
  }
}
export default BoxList;
