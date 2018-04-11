import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

export default class ItemListInBox extends Component {
  handleOnClick = event => {
    const itemId = event.target.id;
    this.props.removeItemsFromBox(itemId, this.props.list.id);
    this.props.isPopped(itemId);
  };

  render() {
    return (
      <ul
        style={{
          listStyleType: 'none',
          padding: 'none',
          margin: '10px',
          width: '300px'
        }}
      >
        {this.props.list.items.map(item => (
          <div
            style={{
              display: 'flex',
              width: '60%',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '-18px'
            }}
            key={item.id}
          >
            <span style={{ cursor: 'pointer' }} onClick={this.handleOnClick}>
              <i
                style={{ color: 'red' }}
                className="fa fa-times"
                id={item.id}
              />
            </span>
            <li
              style={{
                marginLeft: '15px',
                display: 'flex',
                width: '70%',
                justifyContent: 'space-between',
                alignSelf: 'flex-start'
              }}
            >
              <p>{item.name}</p>
              <p>{item.weight}</p>
            </li>
          </div>
        ))}
      </ul>
    );
  }
}
