import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import _ from 'underscore';
import ClassNames from 'classnames';

var SearchControl = Framework.createReactClass({
  componentName: 'SearchControl',
  getInitialState: function() {
    return {
      searchInput: ''
    };
  },
  componentDidMount: function() {
    this.refs.searchInput.focus();
  },
  onClearClicked: function() {
    this.setState({searchInput:''});
    this.refs.searchInput.focus();
  },
  onSearchInputChange: function(e) {
    var val = e.target.value;
    this.setState({searchInput:val});
    if (_.isFunction(this.props.onSearchChange)) {
      this.props.onSearchChange(val);
    }
  },
  onRender: function(data, modelOrCollection, helpers) {
    var clearStyle = {
      display: this.state.searchInput === '' ? 'none' : ''
    };
return (
<div className="f9-search-control input-group">
  <span className="fa fa-search search-control-icon"></span>
  <span className="fa fa-times search-control-clear" onClick={this.onClearClicked} style={clearStyle}></span>
  <input id={this.generateIdInput('search')} type="text" ref="searchInput" placeholder={this.props.placeholder} className="search-control-input" value={this.state.searchInput} onChange={this.onSearchInputChange}/>
</div>
);
  }
});

export default SearchControl;
