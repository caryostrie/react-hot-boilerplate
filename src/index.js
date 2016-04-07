import React from 'react';
import ReactDOM from 'react-dom';

import CollapseViews from './Collapse';
var categories = [
  {id:'category-1',name:'Category 1'},
  {id:'category-2',name:'Category 2'},
  {id:'category-3',name:'Category 3'}
];
var items = [
  {id:'item-1',name:'Item 1',category:'category-2'},
  {id:'item-2',name:'Item 2',category:'category-2'}
];
ReactDOM.render(<CollapseViews.FilterableCollapse categories={categories} items={items} />, document.getElementById('container'));
