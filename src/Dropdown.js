import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import _ from 'underscore';
import ClassNames from 'classnames';

var DropdownItem = Framework.createReactClass({
  componentName: 'DropdownItem',
  onRender: function(data, modelOrCollection, helpers) {
    var item = this.props.item;
return (
<li className="history-select-item dropdown-header history-select-title">
  <a href="#" className="dropdown-header history-select-title" data-id={item.filterId} data-type={item.filterType} data-selection-type={item.selectionType} data-label={item.label}>
    <span className="history-select-row">
      <span className="history-select-cell padding"></span>
      <span className="history-select-cell icon"><i className={item.icon}></i></span>
      <span className="history-select-cell text">{item.label}</span>
      <span className="history-select-cell type">{item.typeLabel}</span>
      <span className="history-select-cell padding"></span>
    </span>
  </a>
</li>
);
  }
});

var Views = {};
Views.Dropdown = Framework.createReactClass({
  componentName: 'Dropdown',
  onRender: function(data, modelOrCollection, helpers) {
var items = this.props.items;
items = items.map(function(item) {
  return <DropdownItem key={Utils.generateGuid()} item={item} />
}.bind(this));
return (
<div className="input-group-btn">
  <button type="button" className="btn btn-default dropdown-toggle btn-history-dropdown" data-toggle="dropdown" tabIndex="-1" disabled={items.length === 0}><span className="caret"></span></button>
  <ul className="history-select dropdown-menu dropdown-menu-right" role="menu">{items}</ul>
</div>
);
  }
});

export default Views;
