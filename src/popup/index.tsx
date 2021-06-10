import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Popup } from './popup';

import { StateProvider } from './context';

import './index.scss';

ReactDOM.render(
  <StrictMode>
    <StateProvider>
      <Popup />
    </StateProvider>
  </StrictMode>,
  document.getElementById('root')
);
