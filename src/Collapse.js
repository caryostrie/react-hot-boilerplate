import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import _ from 'underscore';
import ClassNames from 'classnames';

var itemsToRenderList = function(categories, items) {
  for (var i = 0; i < categories.length; i++) {
    categories[i].items = [];
  }
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var category = _.findWhere(categories, {id:item.category});
    if (category) {
      category.items.push(item);
    }
  }
  return categories;
};

var CategoryItem = Framework.createReactClass({
  componentName: 'CategoryItem',
  getInitialState: function() {
    return {
      show: true
    };
  },
  onHeaderClick: function(e) {
    e.preventDefault();
    this.setState({show:!this.state.show});
  },
  onRender: function(data, modelOrCollection, helpers) {
var headerClass = this.state.show ? 'fa fa-chevron-down' : 'fa fa-chevron-right';
var itemsListClass = ClassNames({
  'collapse-items': true,
  'show': this.state.show,
  'hide': !this.state.show
});
var category = this.props.category;
var items = category.items.map(function(item) {
  return <li key={item.id}>{item.name}</li>
});
return (
  <li>
    <div className="collapse-category-header" onClick={this.onHeaderClick}>
      <i className={headerClass}></i>
      {category.name}
    </div>
    <ul className={itemsListClass}>{items}</ul>
  </li>
);
  }
});

var Views = {};
Views.Collapse = Framework.createReactClass({
  componentName: 'Collapse',
  onRender: function(data, modelOrCollection, helpers) {
var categories = itemsToRenderList(this.props.categories, this.props.items);
categories = _.filter(categories, function(category) {
    return category.items.length;
});
categories = categories.map(function(category) {
  return <CategoryItem key={category.id} category={category} />
});
return (
<ul className="collapse-category">{categories}</ul>
);
  }
});
Views.FilterableCollapse = Framework.createReactClass({
  componentName: 'FilterableCollapse',
  getInitialState: function() {
    return {
      filterText: ''
    };
  },
  onFilterTextChange: function(e) {
    e.preventDefault();
    this.setState({filterText:this.refs.filterTextInput.value});
  },
  onRender: function(data, modelOrCollection, helpers) {
var filterText = this.state.filterText.toLowerCase();
var filteredItems = _.filter(this.props.items, function(item) {
  return item.name.toLowerCase().indexOf(filterText) !== -1;
});
return (
<div>
  <input ref="filterTextInput" placeholder="Search" value={this.props.filterText} onChange={this.onFilterTextChange} />
  <Views.Collapse categories={this.props.categories} items={filteredItems} />
</div>
);
  }
});

export default Views;
