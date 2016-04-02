import React from 'react';
import Framework from './Framework';
import Backbone from 'backbone';
import Utils from './Utils';

var Mock = {
  getSearchResults: function(searchString) {
    var results = [];
    var count = Utils.getRandomInt(1, 10);
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

var Contacts = {};
Contacts.Model = Backbone.Model.extend({
  defaults: {
    name: '',
    email: '',
    notes: []
  }
});
Contacts.Collection = Backbone.Collection.extend({
  model: Contacts.Model
});

var CRM = {};
CRM.PresModel = Backbone.Model.extend({
  defaults: {
    //allContacts: [],
    searchResults: [],
    selectedContact: null,
    selectedContactClean: null
  },

  // actions
  search: function(searchString) {
    this.setSearchResults([]);

    searchString = searchString.trim();
    if (searchString === '') {
      return;
    }

    setTimeout(function() {
      this.setSearchResults(Mock.getSearchResults(searchString));
    }.bind(this), 500);
  },
  setSearchResults: function(searchResults) {
    searchResults = new Contacts.Collection(searchResults);
    this.set('searchResults', searchResults);
    this.selectContact(searchResults.at(0));
  },
  selectContact: function(contact) {

  },
  save: function() {

  },
  cancel: function() {

  }
});

/*
  return (<li key={item.id}>{item.get('name')}</li>)
*/
var CRMResultsItem = Framework.createReactClass({
  componentName: 'CRMResultsItem',
  onRender: function(data, modelOrCollection) {
return (
  <li>{data.name}</li>
);
  }
});

var CRMResults = Framework.createReactClass({
  componentName: 'CRMResults',
  onRender: function(data, modelOrCollection, helpers) {
var results = modelOrCollection.get('searchResults').map(function(item) {
  return <CRMResultsItem key={item.id} model={item} />
});
return (
<ul>{results}</ul>
);
    }
});

CRM.Layout = Framework.createReactClass({
  componentName: 'CRMLayout',
  componentDidMount: function() {
    this.refs.searchInput.focus();
  },
  componentWillUnmount: function() {
  },
  onSearchInputKeyDown: function(e) {
    if (e.keyCode === 13) {
      this.getModel().search(this.refs.searchInput.value);
    }
  },
  onRender: function(data, modelOrCollection, helpers) {
return (
<div id="contact-manager">
  <div className="sidebar">
    <input ref="searchInput" onKeyDown={this.onSearchInputKeyDown}/><br />
    <CRMResults model={modelOrCollection}/>
  </div>
  <div className="contents">
    <div className="header"></div>
    <div className="details"></div>
  </div>
</div>
);
  }
});

export default CRM;
