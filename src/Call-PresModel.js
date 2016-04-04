import Backbone from 'backbone';
import Utils from './Utils';
import _ from 'underscore';

import Contacts from './Contact-Models';

var CallPresModel = Backbone.Model.extend({
  defaults: {
    selectedContact: null
  },
  Key: 'CallPresModel',
  Version: '0',

  isClean: function() {
    var selectedContact = this.get('selectedContact');
    var selectedContactClean = this.get('selectedContactClean');
    if (selectedContact && selectedContactClean) {
      return Utils.areObjectsEqual(selectedContact.toJSON(), selectedContactClean.toJSON());
    }
    return true;
  },

  // actions
  setDisposition: function() {
// TODO
  },
  selectContact: function(contact, force) {
    if (!force && !this.isClean()) return;

    if (contact) {
      contact = contact.clone();
    }
    this.set('selectedContact', contact);
    if (contact) {
      contact = contact.clone();
    }
    this.set('selectedContactClean', contact);
  },
});

export default CallPresModel;
