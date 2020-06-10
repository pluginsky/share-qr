import React from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './popup';

import { StateProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Popup />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
