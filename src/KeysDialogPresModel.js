import Backbone from 'backbone';
import Utils from './Utils';
import _ from 'underscore';

import Keys from './Keys';

var keysToKeyItems = function(keyItems, keyMap) {
  _.each(keyMap, function(item) {
    var splitKeys = item.keys.split(/[\+,>]/);
    if (splitKeys.length) {
      splitKeys = _.map(splitKeys, function(key) {
        key = key.trim();
        if (navigator.appVersion.indexOf('Mac') !== -1) {
          if (key === 'alt') key = 'option';
          if (key === 'enter') key = 'return';
        }
        return key;
      });

      var categories = _.isArray(item.category) ? item.category : [item.category];
      for (var i = 0; i < categories.length; i++) {
        keyItems.push({
          id: Utils.generateGuid(),
          mods: splitKeys.slice(0, splitKeys.length-1),
          key: splitKeys[splitKeys.length-1],
          description: item.description,
          category: categories[i]
        });
      }
    }
  });
};

var PresModel = Backbone.Model.extend({
  defaults: {
    filterText: '',
    categories: [],
    allKeyItems: [],
    keyItems: []
  },

  initialize: function() {
    var categories = Keys.categories;
    categories = categories.map(function(category) {
      category.show = true;
      return category;
    });
    this.set('categories', categories);

    var keyItems = [];
    keysToKeyItems(keyItems, Keys.navigationMap);
    keysToKeyItems(keyItems, Keys.callControlsMap);
    keysToKeyItems(keyItems, Keys.voicemailControlsMap);
    keysToKeyItems(keyItems, Keys.textControlsMap);
    this.set('allKeyItems', keyItems);
    this.set('keyItems', keyItems);
  },

  // props
  getFilterText: function() {
    return this.get('filterText');
  },
  getCategories: function() {
    return this.get('categories');
  },
  getKeyItems: function() {
    return this.get('keyItems');
  },

  // actions
  filter: function(filterText) {
    this.set('filterText', filterText);
    filterText = filterText.toLowerCase();
    var filteredItems = _.filter(this.get('allKeyItems'), function(item) {
      return item.description.toLowerCase().indexOf(filterText) !== -1;
    });
    this.set('keyItems', filteredItems);
  },
  toggleShowCategory: function(category) {
    category.show = !category.show;
    this.trigger('change');
  }
});

export default PresModel;
