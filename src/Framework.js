import _ from 'underscore';
import $ from 'jquery';
import Backbone from 'backbone';
import React, { Component } from 'react';
import ReactBackbone from 'react.backbone';

var extendData = function(data) {
  return data;
};
var ReactFramework = {
  Helpers: {
    arrayToSeparatedList: function(items, spaceAfterComma, separatorSymbol) {
      if (!separatorSymbol) separatorSymbol = ',';
      var separator = (spaceAfterComma) ? separatorSymbol + ' ' : separatorSymbol;
      var s = '';
      if (items && _.isArray(items)) {
        items = _.map(items, function(item) {
          if (item && _.isString(item)) {
            return item.trim();
          }
        });
        items = _.filter(items, function(item) {
          if (item && _.isString(item)) {
            return item;
          }
        });

        for (var i = 0, l = items.length; i < l; i++) {
          s = s + items[i] + (i !== (l-1) ? separator : '');
        }
      }
      return s;
    },
    isNonEmptyString: function(s) {
      return _.isString(s) && s !== '';
    }
  },
  Methods: {
    serializeData: function() {
      var data = {};

      var model = this.getModel();
      var collection = this.getCollection();
      if (model) {
        data = model.toJSON();
      }
      else if (collection) {
        data = { items: collection.toJSON() };
      }
      extendData(data);
      return data;
    },
    render: function() {
      var data = this.serializeData();
      try {
        var modelOrCollection = this.getModel();
        if (this.getCollection()) {
          modelOrCollection = this.getCollection();
        }
        return this.onRender(data, modelOrCollection, ReactFramework.Helpers);
      }
      catch (err) {
        console.error('Framework:ReactView onRender() exception', err);
      }
    }
  },
  ViewHelpers: {
    generateIdString: function(view, name, defaultControlType) {
      if (name === null || name === undefined || name === '') {
        console.error('generateIdString() undefined name');
      }
      var controlType = (defaultControlType) ? defaultControlType : 'label';
      return view + '-' + name.toLowerCase() + '-' + controlType.toLowerCase();
    },
    generateId:  function(name) {
      return this.generateIdString(this.componentName, name, '');
    },
    generateIdAnchor:  function(name) {
      return this.generateIdString(this.componentName, name, 'anchor');
    },
    generateIdButton:  function(name) {
      return this.generateIdString(this.componentName, name, 'button');
    },
    generateIdIcon:  function(name) {
      return this.generateIdString(this.componentName, name, 'icon');
    },
    generateIdList:  function(name) {
      return this.generateIdString(this.componentName, name, 'list');
    },
    generateIdCheckbox:  function(name) {
      return this.generateIdString(this.componentName, name, 'checkbox');
    },
    generateIdGroup:  function(name) {
      return this.generateIdString(this.componentName, name, 'group');
    },
    generateIdInput:  function(name) {
      return this.generateIdString(this.componentName, name, 'input');
    },
    generateIdLabel:  function(name) {
      return generateId(name);
    },
    generateIdMenu:  function(name) {
      return this.generateIdString(this.componentName, name, 'menu');
    },
    generateIdNode:  function(name) {
      return this.generateIdString(this.componentName, name, 'node');
    },
    generateIdProgress:  function(name) {
      return this.generateIdString(this.componentName, name, 'progress');
    },
    generateIdRadio:  function(name) {
      return this.generateIdString(this.componentName, name, 'radio');
    },
    generateIdSection:  function(name) {
      return this.generateIdString(this.componentName, name, 'section');
    },
    generateIdSelect:  function(name) {
      return this.generateIdString(this.componentName, name, 'select');
    },
    generateIdTab:  function(name) {
      return this.generateIdString(this.componentName, name, 'tab');
    }
  }
};

var Framework = {};
_.extend(Framework, {
  // allow Backbone view to have React children
  BaseReactView: Backbone.View.extend({
    render: function() {
      var container = this.el;
      if (this.onReactRender) {
        this.onReactRender(React, ReactDOM, container);
      }
      return this;
    }
  }),
  // React factory helper with all required plugins and helpers
  createReactClass: function(props) {
    props = props || {};
    if (!_.isString(props.componentName)) {
      throw new Error('Framework:createReactClass() must specify a componentName');
    }
    _.extend(props, ReactFramework.Methods);
    _.extend(props, ReactFramework.ViewHelpers);
    var ret = React.createBackboneClass(props);
    return ret;
  }
});

export default Framework;
