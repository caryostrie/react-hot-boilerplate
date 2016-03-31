import React, { Component } from 'react';
import Framework from './Framework';

var AboutDialog = Framework.createReactClass({
  componentName: 'AboutDialog',
  onRender: function(data, modelOrCollection, helpers) {
return (
<div id="about-dialog">
  <tr>
    <If condition={data.icon}>
      <td>
        <div className=
{data.icon}></div>
      </td>
    </If>
    <td>
      <div className="f9-modal-title">TITLE</div>
    </td>
  </tr>
</div>
);
  }
});


export default AboutDialog;
