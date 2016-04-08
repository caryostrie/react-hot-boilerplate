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
var headerClass = this.state.show ? 'fa fa-angle-down' : 'fa fa-angle-right';
var itemsListClass = ClassNames({
  'collapse-items': true,
  'collapse-items-show': this.state.show
});
var category = this.props.category;
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
var categories = itemsToRenderList(this.props.categories, this.props.items);
categories = _.filter(categories, function(category) {
    return category.items.length;
});
categories = categories.map(function(category) {
  return <CategoryItem key={category.id} category={category} />
}.bind(this));
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
  onFilterTextChange: function(val) {
    this.setState({filterText:val});
  },
  onRender: function(data, modelOrCollection, helpers) {
var filterText = this.state.filterText.toLowerCase();
var filteredItems = _.filter(this.props.items, function(item) {
  return item.description.toLowerCase().indexOf(filterText) !== -1;
});
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
              <SearchControl placeholder={'Search for shortcuts...'} value={this.props.filterText} onSearchChange={this.onFilterTextChange} />
{/*}
              <div className="f9-search-control input-group">
                <span className="fa fa-search search-control-icon"></span>
                <span className="fa fa-times search-control-clear" onClick={this.onClearClicked} style={clearStyle}></span>
                <input ref="filterTextInput" className="" placeholder="Search" value={this.props.filterText} onChange={this.onFilterTextChange} />
              </div>
*/}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="f9-modal-body">
      <Views.Collapse categories={this.props.categories} items={filteredItems} />
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
