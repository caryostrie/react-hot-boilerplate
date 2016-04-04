import React from 'react';
import Framework from './Framework';
import Utils from './Utils';

var ContactForm = Framework.createReactClass({
  componentName: 'CRMDetails',

  onFieldChange: function(field, val) {
    var state = {};
    state[field] = val;
    this.setState(state);
    this.getModel().get('selectedContact').set(field, val);
    this.getModel().trigger('change');
  },
  onNameChange: function(e) {
    var val = e.target.value;
    this.onFieldChange('name', val);
  },
  onEmailChange: function(e) {
    var val = e.target.value;
    this.onFieldChange('email', val);
  },
  onCompanyChange: function(e) {
    var val = e.target.value;
    this.onFieldChange('company', val);
  },
  onPrimaryChange: function(e) {
    var val = e.target.value;
    this.onFieldChange('primaryNumber', val);
  },
  onRender: function(data, modelOrCollection) {
var selectedContact = data.selectedContact;
return (
<div className="details">
  <div className="comment">Option 2: Changes will update all panes.</div>
    <If condition={selectedContact}>
      <label className="contact-form-label">Name</label><input value={selectedContact.get('name')} onChange={this.onNameChange} /><br />
      <label className="contact-form-label">Email</label><input value={selectedContact.get('email')} onChange={this.onEmailChange}  /><br />
      <label className="contact-form-label">Company</label><input value={selectedContact.get('company')} onChange={this.onCompanyChange} /><br />
      <label className="contact-form-label">Primary</label><input value={selectedContact.get('primaryNumber')} onChange={this.onPrimaryChange} /><br />
    </If>
  </div>
);
  }
});

export default ContactForm;
