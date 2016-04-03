import Backbone from 'backbone';
import Contacts from './CRM-Models';
import Utils from './Utils';
import _ from 'underscore';

var Mock = {
  createRandomWord: function(length) {
    var consonants = 'bcdfghjklmnpqrstvwxyz'.split('');
    var vowels = 'aeiou'.split('');
    var rand = function(limit) {
      return Math.floor(Math.random()*limit);
    };
    var word = '';
    length = parseInt(length, 10);
    for (var i = 0; i < length/2; i++) {
      var randConsonant = consonants[rand(consonants.length)];
      var randVowel = vowels[rand(vowels.length)];
      word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
      word += i*2<length-1 ? randVowel : '';
    }
    return word;
  },
  createRandomPhrase: function(numWords) {
    var phrase = '';
    for (var i = 0; i < numWords; i++) {
      phrase += Mock.createRandomWord(Utils.getRandomInt(4, 10));
      if (i != (numWords-1)) {
        phrase += ' ';
      }
    }
    return phrase;
  },
  createRandomPhone: function() {
    var USPhoneLength = 10;
    var InternationalPhoneLength = 13;
    var length = (Utils.getRandomInt(0, 5) > 0) ? USPhoneLength : InternationalPhoneLength;
    var phone = '';
    for (var i = 0; i <= length; i++) {
      phone += Utils.getRandomInt(0, 9);
    }
    return phone;
  },
  getSearchResults: function(searchString) {
    var results = [];

    var count = Utils.getRandomInt(10, 200);
    for (var i = 0; i < count; i++) {
      var name = '';
      var email = '';
      if (Utils.getRandomInt(0, 10) < 6) {
        name = 'Name-' + i;
        email = i + '@' + i + '.com';
      }

      var company = '';
      if (Utils.getRandomInt(0, 100) <= 50) {
        company = Mock.createRandomPhrase(Utils.getRandomInt(1, 3));
      }
      var primaryNumber = Mock.createRandomPhone();
      results.push({
        id: Utils.generateGuid(),
        name: name,
        email: email,
        company: company,
        primaryNumber: primaryNumber
      });
    }
    return results;
  }
};

var LocalModel = {
  loadFromLS: function() {
    try {
      var data = localStorage.getItem(this.Key);
      if (data) {
        data = JSON.parse(data);
        if (data.version == this.Version) {
          return data.data;
        }
      }
    }
    catch(err) {}
  },
  saveToLS: function() {
    var data = this.toJSON();
    localStorage.setItem(this.Key, JSON.stringify({
      version: this.Version,
      data: data
    }));
  }
};

var PresModel = Backbone.Model.extend({
  defaults: {
    //allContacts: [],  TODO - demo for showing contact update from another page
    searching: false,
    searchString: '',
    searchResults: [],
    selectedContact: null,
    selectedContactClean: null
  },
  Key: 'CRMPresModel',
  Version: '0',

  customInit: function() {
/*
  DEMO_PROBLEM - second example of model/state discontinuity
    var data = this.loadFromLS();
    if (data) {
      this.set('searchString', data.searchString);
      this.setSearchResults(data.searchResults);
    }

    this.on('change', this.saveToLS, this);
*/
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

    this.set('searchString', searchString);
    this.set('searching', true);
    setTimeout(function() {
      this.set('searching', false);
      this.setSearchResults(Mock.getSearchResults(searchString));
    }.bind(this), 500);
  },
  setSearchString: function(searchString) {
    this.set('searchString', searchString);
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
_.extend(PresModel.prototype, LocalModel);

export default PresModel;
