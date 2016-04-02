import React from 'react';
import Framework from './Framework';
import Backbone from 'backbone';
import Utils from './Utils';
import ClassNames from 'classnames';

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
      return Utils.areObjectsEqual(selectedContact, selectedContactClean);
    }
    return true;
  },

  // actions
  search: function(searchString) {
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
  selectContact: function(contact) {
    this.set('selectedContact', contact);
    this.set('selectedContactClean', contact); // TODO prob need to clone
  },
  save: function() {

  },
  cancel: function() {

  }
});

var CRMResultsItem = Framework.createReactClass({
  componentName: 'CRMResultsItem',
  onItemClick: function(e) {
    this.props.presModel.selectContact(this.getModel());
  },
  onRender: function(data, modelOrCollection) {
var itemClass = ClassNames({
  'selected': this.props.presModel.isSelectedContact(modelOrCollection)
});
return (
  <li className={itemClass} onClick={this.onItemClick}>{data.name}</li>
);
  }
});
var CRMResults = Framework.createReactClass({
  componentName: 'CRMResults',
  onRender: function(data, modelOrCollection, helpers) {
var results = modelOrCollection.get('searchResults').map(function(item) {
  return <CRMResultsItem key={item.id} model={item} presModel={modelOrCollection} />
});
return (
<ul className="search-results">{results}</ul>
);
    }
});

var CRMHeader = Framework.createReactClass({
  componentName: 'CRMHeader',
  onRender: function(data, modelOrCollection) {
return (
<div className="header">
  <If condition={data.selectedContact}>
    <div>{data.selectedContact.get('name')}</div>
    <div>{data.selectedContact.get('email')}</div>
  </If>
  <button className="btn btn-default" disabled={modelOrCollection.isClean()}>Save</button>
  <button className="btn btn-default" disabled={modelOrCollection.isClean()}>Cancel</button>
</div>
);
  }
});

var CRMDetails = Framework.createReactClass({
  componentName: 'CRMDetails',
  onFormItemChange: function(e) {
/*
{data.selectedContact.get('name')}
*/
  },
  onRender: function(data, modelOrCollection) {
return (
<div className="details">
  <If condition={data.selectedContact}>
    <div>Name</div><input onChange={this.onFormItemChange} />
    <div>{data.selectedContact.get('email')}</div>
  </If>
</div>
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
    <input ref="searchInput" className="search-input" onKeyDown={this.onSearchInputKeyDown}/>
    <If condition={data.searching}><i className="search-spinner fa fa-circle-o-notch fa-spin"></i></If>
    <br />
    <CRMResults model={modelOrCollection}/>
  </div>
  <div className="contents">
    <CRMHeader model={modelOrCollection} />
    <CRMDetails model={modelOrCollection} />
  </div>
</div>
);
  }
});

export default CRM;
