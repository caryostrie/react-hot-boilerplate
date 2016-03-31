import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import ClassNames from 'classnames';

import ContactForm from './ContactForm';

var showDirtyDialog = function() {
  $('#dirty-dialog .message').html('Attempt to change unclean shared model');
  $('#dirty-dialog').modal({
    keyboard: false
  });
};

var CallLayout = Framework.createReactClass({
  componentName: 'CallLayout',
  onSetDisposition: function(e){
    e.preventDefault();

    var model = this.getModel();
    if (model.hasOtherChanged()) {
      showDirtyDialog();
    }
    else {
      model.setDisposition();
    }
  },
  onRender: function(data, modelOrCollection, helpers) {
return (
<div id="call-screen">
  Call<br />
  <button className="btn btn-primary" onClick={this.onSetDisposition}>Disposition</button>
  <hr />
  <If condition={data.selectedContact}>
    <ContactForm model={modelOrCollection} />
  </If>
</div>
);
  }
});

export default CallLayout;
