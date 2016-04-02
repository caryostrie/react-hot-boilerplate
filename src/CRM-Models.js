import Backbone from 'backbone';

var Contacts = {};
Contacts.Model = Backbone.Model.extend({
  defaults: {
    name: '',
    email: '',
    notes: []
  }
});
Contacts.Collection = Backbone.Collection.extend({
  model: Contacts.Model
});

export default Contacts;
