import Backbone from 'backbone';
import Contacts from './CRM-Models';
import Utils from './Utils';

var Mock = {
  getSearchResults: function(searchString) {
    var results = [];
    var count = Utils.getRandomInt(10, 200);
    for (var i = 0; i < count; i++) {
      results.push({
        id: Utils.generateGuid(),
        name: 'Name-' + i,
        email: i + '@' + i + '.com',
      });
    }
    return results;
  }
};

var PresModel = Backbone.Model.extend({
  defaults: {
    //allContacts: [],  TODO - demo for showing contact update from another page
    searching: false,
    searchResults: [],
    selectedContact: null,
    selectedContactClean: null
  },

  // props
  isSelectedContact: function(model) {
    if (model && this.get('selectedContact') && model.id === this.get('selectedContact').id) {
      return true;
    }
    return false;
  },
  isClean: function() {
    var selectedContact = this.get('selectedContact');
    var selectedContactClean = this.get('selectedContactClean');
    if (selectedContact && selectedContactClean) {
      return Utils.areObjectsEqual(selectedContact.toJSON(), selectedContactClean.toJSON());
    }
    return true;
  },

  // actions
  search: function(searchString) {
    if (!this.isClean()) return;

    this.setSearchResults([]);

    searchString = searchString.trim();
    if (searchString === '') {
      return;
    }

    this.set('searching', true);
    setTimeout(function() {
      this.set('searching', false);
      this.setSearchResults(Mock.getSearchResults(searchString));
    }.bind(this), 500);
  },
  setSearchResults: function(searchResults) {
    searchResults = new Contacts.Collection(searchResults);
    this.set('searchResults', searchResults);
    this.selectContact(searchResults.at(0));
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
  save: function() {
    var selectedContact = this.get('selectedContact');
    var searchResult = this.get('searchResults').get(selectedContact.id);
    searchResult.set(selectedContact.toJSON());
    this.trigger('change');
    this.selectContact(selectedContact, true);
  },
  cancel: function() {
    var selectedContact = this.get('selectedContactClean');
    selectedContact = selectedContact.clone();
    this.set('selectedContact', selectedContact);
  }
});

export default PresModel;
