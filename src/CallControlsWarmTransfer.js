import React, { Component } from 'react';
import Framework from './Framework';

var KeypadPanel = Framework.createReactClass({
  componentName: 'KeypadPanel',
  getInitialState: function() {
    return {
      showKeypad: true
    };
  },
  onShowKeypadClicked: function(e) {
    this.setState({'showKeypad': !this.state.showKeypad});
  },
  onRender: function(data, modelOrCollection, helpers) {
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

var CallControlsWarmTransfer = Framework.createReactClass({
  componentName: 'CallControlsWarmTransfer',
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    $(React.findDOMNode(this.refs.tt)).tooltip();
    React.findDOMNode(this.refs.myInput).focus();
  },
  componentWillUnmount: function() {
    $(React.findDOMNode(this.refs.tt)).tooltip('destroy');
  },
  onRender: function(data, modelOrCollection, helpers) {
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
      <span ref="tt" title="Warm Transfer Tooltip">Warm Transfer</span>
    </div>
  </div>
  <If condition={data.isSoftphone}>
    <KeypadPanel model={modelOrCollection} />
  </If>
  <div className="row">
{/* commented out */}
    <button onClick={modelOrCollection.completeTransfer.bind(modelOrCollection)}>Complete Transfer</button>
  </div>
  <div className="row">
    <button onClick={modelOrCollection.cancelTransfer.bind(modelOrCollection)}>Cancel Transfer</button>
  </div>
</div>
    );
  }
});

export default CallControlsWarmTransfer;
