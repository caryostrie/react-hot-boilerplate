import React from 'react';
import Framework from './Framework';
import Utils from './Utils';

var CRM = {};

CRM.Contact = function(name, email) {
  return {
    id: Utils.generateGuid(),
    name: name,
    email: email
  };
};
CRM.PresModel = function() {
  return  {
    searchResults: [
      new CRM.Contact('name-1','1@1.com'),
      new CRM.Contact('name-2','2@12com'),
    ],
    allContacts: [],
    selectedContact: null,
    selectedContactClean: null,

    search: function(value) {
      this.searchResults = [];
    }
  };
};

/*
return <CRMResultsItem key={item.id} item={item} />
var CRMResultsItem = React.createClass({
    render: function() {
return (
  <li>{item.name}</li>
);
  }
});

*/
var CRMResults = React.createClass({
    render: function() {
var results = this.props.model.searchResults.map(function(item) {
  return (<li key={item.id}>{item.name}</li>)
});
return (
<ul>{results}</ul>
);
    }
});

CRM.Layout = React.createClass({//Framework.createReactClass({
  componentName: 'CRM',
  componentDidMount: function() {
    this.refs.searchInput.focus();
  },
  componentWillUnmount: function() {
  },
  onSearchInputKeyDown: function(e) {
    if (e.keyCode === 13) {
      this.props.model.search(this.refs.searchInput.value);
    }
  },
  //onRender: function(data, modelOrCollection, helpers) {
    render: function() {
return (
<div id="contact-manager">
  <div id="sidebar">
    <input ref="searchInput" onKeyDown={this.onSearchInputKeyDown}/><br />
    <CRMResults model={this.props.model}/>
  </div>
  <div id="details"></div>
</div>
);
  }
});


export default CRM;
