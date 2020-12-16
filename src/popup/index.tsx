import React from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './popup';

import { StateProvider } from './context';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Popup />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
