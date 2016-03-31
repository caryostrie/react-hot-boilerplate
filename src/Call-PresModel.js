import Backbone from 'backbone';
import Utils from './Utils';
import _ from 'underscore';

import Contacts from './Contact-Models';

var CallPresModel = Backbone.Model.extend({
  defaults: {
    selectedContact: null,
    selectedContactClean: null,
  },
  Key: 'CallPresModel',
  Version: '0',

  hasUserChanged: function() {
    var selectedContact = this.get('selectedContact');
    if (selectedContact) {
      // has user made changes to call contact
      var selectedContactClean = this.get('selectedContactClean');
      if (selectedContact && selectedContactClean) {
        return !Utils.areObjectsEqual(selectedContact.toJSON(), selectedContactClean.toJSON());
      }
    }
    return false;
  },
  hasOtherChanged: function() {
    var selectedContact = this.get('selectedContact');
    if (selectedContact) {
      if (!this.hasUserChanged()) return false;

      // has use made changes on other screens?
      return ContactCache.hasChanged(selectedContact);
    }
    return false;
  },

  // actions
  setDisposition: function() {
    if (this.get('selectedContact')) {
      ContactCache.updateContact(this.get('selectedContact'));
    }
    this.set('selectedContact', null);
    this.set('selectedContactClean', null);
  },
  selectContact: function(contact, force) {
    if (!force && this.hasUserChanged()) return;

    if (contact) {
      contact = contact.clone();
    }
    this.set('selectedContact', contact);
    if (contact) {
      contact = contact.clone();
    }
    this.set('selectedContactClean', contact);
  }
});

export default CallPresModel;
