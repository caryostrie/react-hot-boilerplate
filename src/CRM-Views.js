import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import ClassNames from 'classnames';

import ContactForm from './ContactForm';

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
  onRender: function(data, modelOrCollection, helpers) {
var itemClass = ClassNames({
  'selected': this.props.presModel.isSelectedContact(modelOrCollection)
});
return (
  <li className={itemClass} onClick={this.onItemClick}>
    <div>
      <span className="name">{data.name}</span>
      <span className="company">{data.company}</span>
    </div>
    <div>
      <span className="number-email">{helpers.arrayToSeparatedList([data.primaryNumber,data.email], false, ' / ')}</span>
    </div>
  </li>
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
  <button className="btn btn-primary" disabled={modelOrCollection.isClean()}
    onClick={modelOrCollection.save.bind(modelOrCollection)}>Save</button>
  <button className="btn btn-default" disabled={modelOrCollection.isClean()}
    onClick={modelOrCollection.cancel.bind(modelOrCollection)}>Cancel</button>
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
  onSearchStringChange: function(e) {
    var val = e.target.value;
    this.getModel().setSearchString(val);
  },
  onRender: function(data, modelOrCollection, helpers) {
return (
<div id="contact-manager">
  <div className="sidebar">
    <input ref="searchInput" className="search-input" onKeyDown={this.onSearchInputKeyDown} value={data.searchString} onChange={this.onSearchStringChange}/>
    <If condition={data.searching}><i className="search-spinner fa fa-circle-o-notch fa-spin"></i></If>
    <br />
    <CRMResults model={modelOrCollection}/>
  </div>
  <div className="contents">
    <CRMHeader model={modelOrCollection} />
    <ContactForm model={modelOrCollection} />
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
