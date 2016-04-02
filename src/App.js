import React, { Component } from 'react';
import Framework from './Framework';

import CRM from './CRM';

var contactManager = new CRM.PresModel();
var CRMLayout = CRM.Layout;

export default class App extends Component {
  render() {
    return (
      <CRMLayout model={contactManager} />
    );
  }
}
