import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './Utils';
import _ from 'underscore';

import Framework from './Framework';

import KeysDialogPresModel from './KeysDialogPresModel';
import CollapseViews from './Collapse';

var keysDialogPresModel = new KeysDialogPresModel();
ReactDOM.render(<CollapseViews.FilterableCollapse model={keysDialogPresModel} />, document.getElementById('container'));
