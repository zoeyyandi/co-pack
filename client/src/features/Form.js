import React, { Component } from 'react';
import { addItemOrBox } from '../util/utility';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ItemName: null,
      BoxName: null,
      weight: null
    };
  }
  handleNameChange = event => {
    const name = event.target.value;
    if (event.target.id === 'Item') {
      this.setState({ ItemName: name });
    } else if (event.target.id === 'Box') {
      this.setState({ BoxName: name });
    }
  };
  handleWeightChange = event => {
    const weight = event.target.value;
    this.setState({ weight });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.update();
    this.setState({ weight: '', BoxName: '', ItemName: '' });
  };

  update = async () => {
    const data = await addItemOrBox(
      this.state.ItemName,
      this.state.BoxName,
      this.state.weight
    );
    this.props.updateItems
      ? this.props.updateItems(data)
      : this.props.updateBoxes(data);
  };

  render() {
    return (
      <form
        style={{
          backgroundColor: '#E2E3E4',
          borderRadius: '5px',
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: '35px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '150px',
          paddingLeft: '30px'
        }}
      >
        <label
          style={{
            margin: '10px'
          }}
        >
          {this.props.label1} Name:
          <input
            style={{
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid gray',
              backgroundColor: '#E2E3E4'
            }}
            type="text"
            onChange={this.handleNameChange}
            id={this.props.label1}
            value={
              this.props.label1 === 'Item'
                ? this.state.ItemName
                : this.state.BoxName
            }
          />
        </label>
        <label
          style={{
            margin: '10px',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Weight:
          <input
            style={{
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid gray',
              backgroundColor: '#E2E3E4'
            }}
            type="text"
            onChange={this.handleWeightChange}
            value={this.state.weight}
          />
        </label>
        <input
          style={{
            margin: '10px',
            border: 'none',
            borderRadius: '5px'
          }}
          type="submit"
          value="Submit"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default Form;
