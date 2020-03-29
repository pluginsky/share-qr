import React from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './popup';

import { StateProvider } from './context';

ReactDOM.render(
  <StateProvider>
    <Popup />
  </StateProvider>,
  document.getElementById('root')
);
