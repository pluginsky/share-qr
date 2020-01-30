import React from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './Popup';

import { StateProvider } from './context';

ReactDOM.render(
  <StateProvider>
    <Popup />
  </StateProvider>,
  document.getElementById('root')
);
