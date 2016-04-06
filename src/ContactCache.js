import Backbone from 'backbone';
import Utils from './Utils';
import _ from 'underscore';

import Contacts from './Contact-Models';

var ContactCache = {
  _allContacts: {},

  getContact: function(id) {
    if (this._allContacts[id]) {
      return this._allContacts[id].contact;
    }
    return undefined;
  },
  addContact: function(contact) {
    if (this.getContact(contact.id)) {
      this._allContacts[contact.id].refCount++;
    }
    else {
// TODO this should just store id & modTime.  It's too easy to mess up the contact
      this._allContacts[contact.id] = {
        contact: contact,
        refCount: 1
      };
    }
  },
  removeContact: function(id) {
    if (this.getContact(id)) {
      this._allContacts[id].refCount--;
      if (this._allContacts[id].refCount === 0) {
        delete this._allContacts[id];
      }
    }
  },
  updateContact: function(contact) {
    if (this.getContact(contact.id)) {
      if (this.hasChanged(contact)) {
        throw new Error('Contact changed');
      }
      contact = contact.clone();
      contact.touch();
      this._allContacts[contact.id].contact = contact;
      console.log('updateContact [' + contact.id + ',' + contact.get('modificationTime') +']');
    }
  },
  hasChanged: function(newContact) {
    var oldContact = this.getContact(newContact.id);
    if (oldContact) {
      console.log('compareContact [' + newContact.id + ',' + newContact.get('modificationTime') +']');
      console.log('compareContact [' + oldContact.id + ',' + oldContact.get('modificationTime') +']');
      return newContact.get('modificationTime') !== oldContact.get('modificationTime');
    }
    return false;
  }
};
window.ContactCache = ContactCache;

export default ContactCache;
