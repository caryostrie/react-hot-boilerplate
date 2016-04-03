import React from 'react';
import ReactDOM from 'react-dom';

import CRMPresModel from './CRM-PresModel';
import CRMLayout from './CRM-Views';

var contactManager = new CRMPresModel();
contactManager.customInit();

import CallLayout from './Call-Views';

// this example uses a jq/bs tab.  might convert to React later
ReactDOM.render(<CRMLayout model={contactManager} />, document.getElementById('crm'));
ReactDOM.render(<CallLayout />, document.getElementById('call'));
