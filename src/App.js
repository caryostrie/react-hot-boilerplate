import React, { Component } from 'react';
import Framework from './Framework';

import CallControlsWarmTransfer from './CallControlsWarmTransfer';

var Model = Backbone.Model.extend({
  completeTransfer: function(e) {
    console.log('completeTransfer', e);
    alert('Complete Transfer [' + this.get('email') + ']');
  },
  cancelTransfer: function(e) {
    console.log('cancelTransfer', e);
    alert('Cancel Transfer [' + this.get('email') + ']');
  }
});
var myModel = new Model({
  email: 'test@test.com',
  isSoftphone: true,
  isActionInProgress: false
});

export default class App extends Component {
  render() {
    return (
      <CallControlsWarmTransfer model={myModel} />
    );
  }
}
