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

var CRM = {};

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
  <If condition={data.selectedContactClean}>
    <div>{data.selectedContactClean.get('name')}</div>
    <div>{data.selectedContactClean.get('email')}</div>
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
    <div>Changes here will only update this pane.</div>
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
