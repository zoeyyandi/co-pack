import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { Types } from '../../Constants';
import { addBoxIdtoItem } from '../../util/utility';

const itemSource = {
  beginDrag(props) {
    return {
      itemId: props.item.id,
      weight: props.item.weight
    };
  },
  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (monitor.didDrop()) {
      addBoxIdtoItem(props.item.id, dropResult.boxId);
      props.isDropped(props.item.id);
      props.addItemsToBox(props.item, dropResult.boxId);
      // handle error message
    } else {
      const message = props.isOver
        ? 'Not enough space!'
        : 'Please drag into a box!';
      props.updateErrorMessage(message);
    }
    props.updateIsOver(false);
  },
  canDrag(props, monitor) {
    return props.draggable(props.item.id);
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource()
});

class EachItem extends Component {
  render() {
    const { item, connectDragSource, draggable } = this.props;
    return connectDragSource(
      <li
        style={{
          padding: '5px 10px 5px 10px',
          backgroundColor: draggable(item.id) ? '#A0DAF7' : '#E2E3E4',
          display: 'flex',
          justifyContent: 'space-between',
          margin: '15px',
          borderRadius: '5px'
        }}
      >
        <p>{item.name}</p>
        <p>w. {item.weight}</p>
      </li>
    );
  }
}

export default DragSource(Types.ITEM, itemSource, collect)(EachItem);
