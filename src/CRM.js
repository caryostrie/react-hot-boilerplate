import React from 'react';
import Framework from './Framework';
import Backbone from 'backbone';
import Utils from './Utils';
import ClassNames from 'classnames';

var showDirtyDialog = function() {
  $('#dirty-dialog').modal({
    keyboard: false
  });
};

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
  selectContact: function(contact) {
    if (!this.isClean()) return;

    if (contact) {
      contact = new Contacts.Model(contact.toJSON());
    }
    this.set('selectedContact', contact);
    if (contact) {
      contact = new Contacts.Model(contact.toJSON());
    }
    this.set('selectedContactClean', contact);
  },
  save: function() {

  },
  cancel: function() {
    var selectedContact = this.get('selectedContactClean');
    selectedContact = new Contacts.Model(selectedContact.toJSON());
    this.set('selectedContact', selectedContact);
  }
});

var CRMResultsItem = Framework.createReactClass({
  componentName: 'CRMResultsItem',
  onItemClick: function(e) {
    var model = this.props.presModel;
    if (model.isClean()) {
      model.selectContact(this.getModel());
    }
    else {
      showDirtyDialog();
    }
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
  <button className="btn btn-default" disabled={modelOrCollection.isClean()}
    onClick={modelOrCollection.save.bind(modelOrCollection)}>Save</button>
  <button className="btn btn-default" disabled={modelOrCollection.isClean()}
    onClick={modelOrCollection.cancel.bind(modelOrCollection)}>Cancel</button>
</div>
);
  }
});

var CRMDetails = Framework.createReactClass({
  componentName: 'CRMDetails',
  getInitialState:  function() {
    return {
      name: '',
      email: ''
    }
  },
  componentDidMount: function() {
    this.getModel().on('change:selectedContact', this.onSelectedContactChanged, this);
  },
  componentWillUnmount: function() {
    this.getModel().off('change:selectedContact', this.onSelectedContactChanged, this);
  },
  onSelectedContactChanged: function() {
    var selectedContact = this.getModel().get('selectedContact');
    if (selectedContact) {
      selectedContact = selectedContact.toJSON();
      this.setState({
        name: selectedContact.name,
        email: selectedContact.email,
      });
    }
    else {
      this.setState(this.getInitialState());
    }
  },

  onNameChange: function(e) {
    var val = e.target.value;
    this.setState({'name': val});
    this.getModel().get('selectedContact').set('name', val);
    this.getModel().trigger('change');
  },
  onRender: function(data, modelOrCollection) {
return (
<div className="details">
  <If condition={data.selectedContact}>
    <div>Name</div><input value={this.state.name} onChange={this.onNameChange} />
    <div>Email</div><input value={this.state.email} disabled="disabled" />
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
      this.doSearch();
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
  },

  doSearch: function() {
    var model = this.getModel();
    if (model.isClean()) {
      model.search(this.refs.searchInput.value);
    }
    else {
      showDirtyDialog();
    }
  }
});

export default CRM;
