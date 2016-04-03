import React from 'react';
import Framework from './Framework';
import Utils from './Utils';
import ClassNames from 'classnames';

import ContactForm from './ContactForm';

var CallLayout = Framework.createReactClass({
  componentName: 'CallLayout',
  onRender: function(data, modelOrCollection, helpers) {
return (
<div id="call-screen">
  Call
</div>
);
  }
});

export default CallLayout;
