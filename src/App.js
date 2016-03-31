import React, { Component } from 'react';
import ReactDOM from 'react-dom';


var Model = {
  email: 'test@test.com',
  isSoftphone: true,
  isActionInProgress: false,

  completeTransfer: function(e) {
    console.log('completeTransfer', e);
    alert('Complete Transfer [' + this.email + ']');
  },
  cancelTransfer: function(e) {
    console.log('cancelTransfer', e);
    alert('Cancel Transfer [' + this.email + ']');
  }
};

var KeypadPanel = React.createClass({
  getInitialState: function() {
    return {
      showKeypad: true
    };
  },
  onShowKeypadClicked: function(e) {
    this.setState({'showKeypad': !this.state.showKeypad});
  },
  render: function() {
var data = this.props.model;
    return (
<div>
  <div className="row">
    <button onClick={this.onShowKeypadClicked}>Show Keypad</button>
  </div>
  <If condition={this.state.showKeypad}>
    <div className="row">KEYPAD</div>
  </If>
  <hr />
</div>
    );
  }
});

var CallControlsWarmTransfer = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    this.refs.myInput.focus();
  },
  componentWillUnmount: function() {},
  render: function() {
var data = this.props.model;
  return (
<div>
  <input ref="myInput" />
  <div className="row group-separator-container">
    <div className="group-separator-title">
      <span>{data.email}</span>
    </div>
  </div>
  <hr />
  <div className="row group-separator-container">
    <div className="group-separator-title">
      <span>Warm Transfer</span>
    </div>
  </div>
  <If condition={data.isSoftphone}>
    <KeypadPanel model={data} />
  </If>
  <div className="row">
{/* commented out */}
    <button onClick={data.completeTransfer.bind(data)}>Complete Transfer</button>
  </div>
  <div className="row">
    <button onClick={data.cancelTransfer.bind(data)}>Cancel Transfer</button>
  </div>
</div>
    );
  }
});


export default class App extends Component {
  render() {
    return (
      <CallControlsWarmTransfer model={Model} />
    );
  }
}
