import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import _ from 'underscore';
import ClassNames from 'classnames';
import SearchControl from './SearchControl';

var itemsToRenderList = function(categories, items) {
  for (var i = 0; i < categories.length; i++) {
    categories[i].items = [];
  }
  for (i = 0; i < items.length; i++) {
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
  onHeaderClick: function(e) {
    e.preventDefault();
    this.getModel().toggleShowCategory(this.props.category)
  },
  onRender: function(data, modelOrCollection, helpers) {
var category = this.props.category;
var headerClass = category.show ? 'fa fa-angle-down' : 'fa fa-angle-right';
var itemsListClass = ClassNames({
  'collapse-items': true,
  'collapse-items-show': category.show
});
var items = category.items.map(function(item) {
  return (<tr height="26px" key={item.id} className="item-name">
    <td>{item.description}</td>
    <td>
    {item.mods.map(function(mod) {
      return [<span className="item-key-mod">{mod}</span>,<span className="item-key-plus">+</span>]
    })}
    <span className="item-key">{item.key}</span>
    </td>
  </tr>);
});
return (
  <li>
    <div className="collapse-category-header" onClick={this.onHeaderClick}>
      <i className={headerClass}></i>
      {category.name}
    </div>
    <table className={itemsListClass}>
      <thead><tr><th></th><th></th></tr></thead>
      <tbody>{items}</tbody>
    </table>
  </li>
);
  }
});

var Views = {};
Views.Collapse = Framework.createReactClass({
  componentName: 'Collapse',
  onRender: function(data, modelOrCollection, helpers) {
var categories = itemsToRenderList(modelOrCollection.getCategories(), modelOrCollection.getKeyItems());
categories = _.filter(categories, function(category) {
  return category.items.length;
});
categories = categories.map(function(category) {
  return <CategoryItem key={category.id} category={category} model={modelOrCollection} />
}.bind(this));
return (
<ul className="collapse-category">{categories}</ul>
);
  }
});
Views.FilterableCollapse = Framework.createReactClass({
  componentName: 'FilterableCollapse',
  onFilterTextChange: function(val) {
    this.getModel().filter(val);
  },
  onRender: function(data, modelOrCollection, helpers) {
var filteredItems = modelOrCollection.getKeyItems();
return (
<div className="f9-modal-dialog">
  <div className="f9-modal-content">
    <div className="f9-modal-header">
      <table width="100%">
        <tbody>
          <tr>
            <td className="f9-modal-icon">
              <i className="f9-modal-icon f9-icon fa fa-keyboard-o"></i>
            </td>
            <td>
              <div className="f9-modal-title">REPLACE</div>
            </td>
            <td>
              <SearchControl placeholder={'Search for shortcuts...'} value={modelOrCollection.getFilterText()} onSearchChange={this.onFilterTextChange} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="f9-modal-body">
      <Views.Collapse model={modelOrCollection} />
    </div>
    <div className="f9-modal-footer">
      <button id={this.generateIdButton('close')} className="btn f9-positive-cta-btn">Dismiss</button>
    </div>
  </div>
</div>
);
  }
});

export default Views;
