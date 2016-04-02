import React, { Component } from 'react';
import Framework from './Framework';

import CRMPresModel from './CRM-PresModel';
import CRMViews from './CRM-Views';

var contactManager = new CRMPresModel();
var CRMLayout = CRMViews.Layout;

export default class App extends Component {
  render() {
    return (
      <CRMLayout model={contactManager} />
    );
  }
}
