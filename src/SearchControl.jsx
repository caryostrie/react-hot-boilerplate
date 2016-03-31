import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import _ from 'underscore';
import ClassNames from 'classnames';

var SearchControl = Framework.createReactClass({
  componentName: 'SearchControl',
  getInitialState: function() {
    return {
      filterText: ''
    };
  },
  onFilterTextChange: function(e) {
  },
  onRender: function(data, modelOrCollection, helpers) {
return (
<div className="f9-search-control">
  <input id={this.generateIdInput('search')} />
</div>
);
  }
});

export default SearchControl;
