import React from 'react';
import ReactDOM from 'react-dom';

import CRMPresModel from './CRM-PresModel';
import CRMViews from './CRM-Views';

var contactManager = new CRMPresModel();
var CRMLayout = CRMViews.Layout;

// this example uses a jq/bs tab.  might convert to React later
ReactDOM.render(<CRMLayout model={contactManager} />, document.getElementById('crm'));
