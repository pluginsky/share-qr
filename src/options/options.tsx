import React from 'react';

import { Storage } from './containers/Storage';
import { Actions } from './containers/Actions';

import './options.scss';

export const Options: React.FC = () => (
  <div className="container">
    <Storage />
    <Actions />
  </div>
);
