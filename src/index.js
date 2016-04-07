import React from 'react';
import ReactDOM from 'react-dom';

import Framework from './Framework';

import CollapseViews from './Collapse';

var KeyItemView = Framework.createReactClass({
  componentName: 'KeyItemView',
  onRender: function() {
    var item = this.props.item;
    return <li key={item.id}><span className="item-key">{item.key}</span> = {item.name}</li>
  }
});

var categories = [
  {id:'category-1',name:'Category 1'},
  {id:'category-2',name:'Category 2'},
  {id:'category-3',name:'Category 3'}
];
/*
var items = [
  {id:'item-1',name:'Item 1',category:'category-2'},
  {id:'item-2',name:'Item 2',category:'category-2'}
];
*/
var keyItems = [
  {id:'item-1',name:'Item 1',key:'H',category:'category-2'},
  {id:'item-2',name:'Item 2',key:'V',category:'category-2'}
];
ReactDOM.render(<CollapseViews.FilterableCollapse categories={categories} items={keyItems} itemView={KeyItemView} />, document.getElementById('container'));
