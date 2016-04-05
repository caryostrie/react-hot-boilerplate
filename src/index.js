import React from 'react';
import ReactDOM from 'react-dom';

import ContactCache from './ContactCache';
import Contacts from './Contact-Models';

var contactCache = ContactCache
var sharedContact = new Contacts.Model({
  id: 'shared-contact-1',
  name: 'Shared Contact',
  company: 'Shared Company'
});
contactCache.addContact(sharedContact);

import CRMPresModel from './CRM-PresModel';
import CRMLayout from './CRM-Views';
var contactManager = new CRMPresModel();
//contactManager.customInit();
window.gContactManager = contactManager

import CallPresModel from './Call-PresModel';
import CallLayout from './Call-Views';
var call = new CallPresModel();
call.selectContact(sharedContact, true);

// this example uses a jq/bs tab.  might convert to React later
ReactDOM.render(<CRMLayout model={contactManager} />, document.getElementById('crm'));
ReactDOM.render(<CallLayout model={call} />, document.getElementById('call'));
