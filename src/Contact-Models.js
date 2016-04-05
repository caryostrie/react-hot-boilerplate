import Backbone from 'backbone';

var Contacts = {};
Contacts.Model = Backbone.Model.extend({
  defaults: {
    name: '',
    email: '',
    company: '',
    primaryNumber: '',
    modificationTime: new Date().getTime()
  },
  touch: function() {
    this.set('modificationTime', new Date().getTime())
  }
});
Contacts.Collection = Backbone.Collection.extend({
  model: Contacts.Model,

  initialize: function() {
    this.sortType = 'ascending';
  },
  comparator: function(a, b) {
    var ascending = (this.sortType === 'ascending') ? 1 : -1;
    if (a && b) {
      return a.get('name').localeCompare(b.get('name')) * ascending;
    }
    return 0;
  }
});

export default Contacts;
