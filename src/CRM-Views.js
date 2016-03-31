import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import ClassNames from 'classnames';

import ContactForm from './ContactForm';

var showDirtyDialog = function(type) {
  var message = (type === 'cacheModified') ? 'Attempt to change unclean shared model' : 'Must save or cancel';
  $('#dirty-dialog .message').html();
  $('#dirty-dialog').modal({
    keyboard: false
  });
};

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
<li className={itemClass} onClick={this.onItemClick} data-id={data.id} data-f9-template={this.componentName}>
  <div>
    <If condition={helpers.isNonEmptyString(data.name)}>
      <span className="name">{data.name}</span>
    </If>
    <span className="company">{data.company}</span>
  </div>
  <div>
    <span className="number-email">{helpers.arrayToSeparatedList([helpers.formatPhoneNumber(data.primaryNumber),data.email], false, ' / ')}</span>
  </div>
</li>
);
  }
});
var CRMResults = Framework.createReactClass({
  componentName: 'CRMResults',
  onRender: function(data, modelOrCollection, helpers) {
var results = modelOrCollection.get('searchResults')
results = results.map(function(item) {
  return <CRMResultsItem key={item.id} model={item} presModel={modelOrCollection} />
});
return (
<ul className="search-results" data-f9-template={this.componentName}>{results}</ul>
);
    }
});

var CRMHeader = Framework.createReactClass({
  componentName: 'CRMHeader',
  onSaveClicked: function(e) {
    e.preventDefault();

    var model = this.getModel();
    var selectedContact = model.get('selectedContact');
    if (ContactCache.hasChanged(selectedContact)) {
      showDirtyDialog('cacheModified');
    }
    else {
      model.save();
    }
  },
  onRender: function(data, modelOrCollection, helpers) {
return (
<div className="header" data-f9-template={this.componentName}>
  <If condition={data.selectedContactClean}>
    <div className="name">{data.selectedContactClean.get('name')}</div>
    <div className="number">{helpers.formatPhoneNumber(data.selectedContactClean.get('primaryNumber'))}</div>
    <div className="email">{data.selectedContactClean.get('email')}</div>
  </If>
  <button className="btn btn-primary" disabled={modelOrCollection.isClean()}
    onClick={this.onSaveClicked}>Save</button>
  <button className="btn btn-default" disabled={modelOrCollection.isClean()}
    onClick={modelOrCollection.cancel.bind(modelOrCollection)}>Cancel</button>
</div>
);
  }
});

var CRMLayout = Framework.createReactClass({
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
  onSortClicked: function() {
    var model = this.getModel();
    model.toggleSort();

    setTimeout(function() {
      // scroll to selected contact.  it is still possible to use jq for animate.  it's probably better to avoid
      var parent = document.querySelector('.search-results');
      var selectedContact = model.get('selectedContact');
      if (selectedContact) {
        var child = document.querySelector('li[data-id="' + selectedContact.id + '"]');
        scrollTo = child.offsetTop - parent.offsetTop;
      }
      else {
        scrollTo = 0;
      }
      $(parent).animate({scrollTop:scrollTo});
    }, 250);
  },
  onRender: function(data, modelOrCollection, helpers) {
return (
<div id="contact-manager" data-f9-template={this.componentName}>
  <div className="sidebar">
    <If condition={data.sort === 'ascending'}>
      <i className="sort-button fa fa-chevron-up" onClick={this.onSortClicked}></i>
    </If>
    <If condition={data.sort === 'descending'}>
      <i className="sort-button fa fa-chevron-down" onClick={this.onSortClicked}></i>
    </If>
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
      showDirtyDialog('isClean');
    }
  }
});

export default CRMLayout;
