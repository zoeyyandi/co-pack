import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import BoxList from './features/Box/BoxList';
import { ItemList } from './features/Item/ItemList';
import { Users } from './features/User/Users';
import { createUser } from './util/utility';
import { DragDropContext } from 'react-dnd';
import { Toast } from './features/Toast';
import Form from './features/Form';
import HTML5Backend from 'react-dnd-html5-backend';

const ENDPOINT = 'http://127.0.0.1:3001';

class App extends Component {
  socket = socketIOClient(ENDPOINT);
  user = createUser();
  constructor() {
    super();
    this.state = {
      users: [],
      items: [],
      boxes: [],
      droppedItemIds: [],
      errorMsg: null,
      canDrop: false,
      isOver: false
    };
  }

  componentDidMount() {
    fetch('/boxes')
      .then(res => res.json())
      .then(boxes => this.setState({ boxes }));

    fetch('/items')
      .then(res => res.json())
      .then(items => this.setState({ items }));

    this.socket.on('connect', () => {
      console.log('connected to server');
      this.socket.emit('user', this.user);
    });
    this.socket.on('onlineUsers', userData => {
      this.setState({ users: userData });
    });
    this.socket.on('end', userData => {
      this.setState({ users: userData });
    });
  }

  updateItems = items => this.setState({ items });

  updateBoxes = boxes => this.setState({ boxes });

  isDropped = itemId => {
    this.setState({
      droppedItemIds: [...this.state.droppedItemIds, itemId]
    });
  };

  isPopped = itemId => {
    this.setState({
      droppedItemIds: this.state.droppedItemIds.filter(id => id !== itemId)
    });
  };

  draggable = itemId => !this.state.droppedItemIds.includes(itemId);

  addItemsToBox = (item, boxId) => {
    const newBoxes = this.state.boxes.map(box => {
      if (box.id === boxId) {
        const newBox = { ...box, items: [...box.items, item] };
        return newBox;
      }
      return box;
    });

    this.setState({ boxes: newBoxes });
  };

  removeItemsFromBox = (itemId, boxId) => {
    const newBoxes = this.state.boxes.map(box => {
      if (box.id === boxId) {
        const filteredItems = box.items.filter(item => item.id !== itemId);
        const newBox = { ...box, items: filteredItems };
        return newBox;
      }
      return box;
    });
    this.setState({ boxes: newBoxes });
  };

  updateErrorMessage = message => {
    this.setState({ errorMsg: message }, () => {
      setTimeout(() => {
        this.setState({ errorMsg: null });
      }, 3000);
    });
  };

  updateIsOver = bool => {
    this.setState({ isOver: bool });
  };

  render() {
    return (
      <div className="App">
        <Users users={this.state.users} />
        <div className="ListContainer">
          <ItemList
            className="ItemList"
            items={this.state.items}
            isDropped={this.isDropped}
            draggable={this.draggable}
            updatelastDndItem={this.updatelastDndItem}
            addItemsToBox={this.addItemsToBox}
            updateErrorMessage={this.updateErrorMessage}
            canDrop={this.state.canDrop}
            isOver={this.state.isOver}
            updateIsOver={this.updateIsOver}
          />
          {this.state.errorMsg && <Toast errorMsg={this.state.errorMsg} />}
          <div className="formContainer">
            <Form label1="Item" updateItems={this.updateItems} />
            <Form label1="Box" updateBoxes={this.updateBoxes} />
          </div>
          <BoxList
            className="BoxList"
            boxes={this.state.boxes}
            removeItemsFromBox={this.removeItemsFromBox}
            isPopped={this.isPopped}
            updateIsOver={this.updateIsOver}
          />
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
