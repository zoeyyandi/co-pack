import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Types } from '../../Constants';
import ItemListInBox from './ItemListInBox';
import { addWeightOfItemsInBox, letDrop } from '../../util/utility';

const boxTarget = {
  drop(props, monitor) {
    return {
      boxId: props.box.id
    };
  },

  hover(props, monitor) {
    console.log(monitor.isOver());
    props.updateIsOver(monitor.isOver());
  },

  canDrop(props, monitor) {
    const item = monitor.getItem();
    const itemsWeight = addWeightOfItemsInBox(props.box.items);
    return letDrop(itemsWeight, item.weight, props.box.total_allowed_weight);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

class EachBox extends Component {
  addItems = item => {
    this.setState({ addedItemsList: [...this.state.addedItemsList, item] });
  };

  render() {
    const {
      box,
      connectDropTarget,
      isOver,
      removeItemsFromBox,
      isPopped
    } = this.props;
    const itemsWeight = addWeightOfItemsInBox(box.items);
    const allowDrop = itemsWeight < box.total_allowed_weight ? true : false;
    const getColor = (isOver, allowDrop) => {
      if (isOver) {
        return '#FF907F';
      } else if (allowDrop) {
        return '#579BE5';
      } else {
        return '#E2E3E4';
      }
    };
    return connectDropTarget(
      <li
        style={{
          padding: '10px 10px 0 10px',
          display: 'flex',
          backgroundColor: getColor(isOver, allowDrop),
          justifyContent: 'center',
          flexDirection: 'column',
          margin: '15px',
          borderRadius: '5px'
        }}
      >
        <p style={{ margin: 0 }}>{box.name}</p>
        <ItemListInBox
          list={this.props.box}
          removeItemsFromBox={removeItemsFromBox}
          isPopped={isPopped}
        />
        <p>
          t.w. {itemsWeight}/{box.total_allowed_weight}
        </p>
      </li>
    );
  }
}

export default DropTarget(Types.ITEM, boxTarget, collect)(EachBox);
