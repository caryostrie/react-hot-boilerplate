import React from 'react';
import Framework from './Framework';
import Utils from './Utils';

var ContactForm = Framework.createReactClass({
  componentName: 'CRMDetails',
  getInitialState:  function() {
    return {
      name: '',
      email: '',
      company: '',
      primaryNumber: ''
    };
  },
  componentDidMount: function() {
    this.getModel().on('change:selectedContact', this.onSelectedContactChanged, this);
  },
  componentWillUnmount: function() {
    this.getModel().off('change:selectedContact', this.onSelectedContactChanged, this);
  },
  onSelectedContactChanged: function() {
    // DEMO_PROBLEM - first example of model/state discontinuity.  this can easily cause confusion since data is persisted in two places
    // need to do some research to find a simpler way to represent this
    var selectedContact = this.getModel().get('selectedContact');
    if (selectedContact) {
      selectedContact = selectedContact.toJSON();
      this.setState({
        name: selectedContact.name,
        email: selectedContact.email,
        company: selectedContact.company,
        primaryNumber: selectedContact.primaryNumber,
      });
    }
    else {
      this.setState(this.getInitialState());
    }
  },

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
  onRender: function(data, modelOrCollection) {
return (
<div className="details">
  <div className="comment">Option 2: Changes will update all panes.</div>
  <If condition={data.selectedContact}>
    <label className="contact-form-label">Name</label><input value={this.state.name} onChange={this.onNameChange} /><br />
    <label className="contact-form-label">Email</label><input value={this.state.email} disabled={true} /><br />
    <label className="contact-form-label">Company</label><input value={this.state.company} onChange={this.onCompanyChange} disabled={true} /><br />
    <label className="contact-form-label">Primary</label><input value={this.state.primaryNumber} onChange={this.onPrimaryChange} disabled={true} /><br />
  </If>
</div>
);
  }
});

export default ContactForm;
